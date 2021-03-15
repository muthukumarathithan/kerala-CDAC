const db = require('../models');

exports.showPolls = async(req, res, next) =>{
    try {
        console.log(req.body);
        const polls = await db.Poll.find().populate('user',['username','id']);
        res.status(200).json(polls)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.getPoll = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const polls = await db.Poll.findById(id).populate('user',['username','id']);
        res.status(200).json(polls)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.deletePoll = async(req, res, next) =>{
    try {
        const {id:pollId} = req.params;
        const {id:userId} = req.decoded;
        const poll = await db.Poll.findById(pollId);
        if(poll.user.toString() === userId)
          await poll.remove()
         else throw new Error('Unauthorized access'); 
        res.status(200).json(poll)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.createPoll = async(req, res, next) =>{
    try {
        const {question, options} = req.body;
        const {id} = req.decoded;
        const user = await db.User.findById(id);        
        const poll =  await db.Poll.create({
            question,
            user,
            options:options.map(option =>({
                option,
                votes:0
            }))

        });
        user.polls.push(poll);
        await user.save()
        res.status(200).json({
            poll:poll._doc,
            user:user._id
        });
    } catch (error) {
        error.code = 400;
        next(error)
    }
}

exports.getUserPolls = async(req, res, next) =>{
    try {
        const {id} = req.decoded;
        const polls = await db.User.findById(id).populate('polls');
        res.status(200).json(polls)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 


exports.vote = async(req, res, next) =>{
    try {
        const {id:userId} = req.decoded;
        const {id:pollId} = req.params;
        const {answer} = req.body;

        if(answer){ 
            const poll = await db.Poll.findById(pollId);
            if(!poll) throw new Error('No Poll found');
            const vote = await poll.options.map(option =>{
                if(option.option === answer){
                    return {
                        option:option.option,
                        _id:option._id,
                        votes:option.votes + 1
                    }
                }else {
                    return option 
                }
            })

            if(poll.voted.filter(user=> user.toString() === userId).length <= 0){
                poll.voted.push(userId);
                poll.options = vote;
                await poll.save()
                res.status(201).json(poll);
            }else{
                throw new Error('Already Voted')
            }
              
             
             

        }else{
            throw new Error('No Answer Provided')
        }

    } catch (error) {
        error.status = 400;
        next(error)
    }
}