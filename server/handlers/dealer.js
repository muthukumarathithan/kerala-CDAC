const db = require('../models');

exports.showDealers = async(req, res, next) =>{
    try {
        const {id, user_type} = req.decoded;
        var filter = {}
        if(user_type === 2)
          filter = {distributor:id}
       const devices = await db.Dealer.find(filter)
        .populate('distributor');
        res.status(200).json(devices)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.getDealer = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const dealer = await db.Dealer.findById(id)
          .populate('distributors')
        res.status(200).json(dealer)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 


exports.createDealer = async(req, res, next) =>{
    try {
        const {id, user_type} = req.decoded;
        if(user_type === 2)
           req.body.distributor = id;
        const dealer =  await db.Dealer.create({
            ...req.body,
            created_by:id,
         });
         const user_data = {
            username:req.body.mobile,
            password:req.body.mobile,
            user_type:3,
            dealer:dealer
        }
        const user = await db.User.create(user_data);
        res.status(200).json(dealer);
    } catch (error) {
        error.code = 400;
        next(error)
    }
}

exports.updateDealer = async(req, res, next) =>{
    try {
        const dealer = await db.Dealer.findById(req.params.id);
        if(!dealer) throw new Error('No Poll found');
        dealer.firstName = req.body.firstName;
        dealer.lastName = req.body.lastName;
        dealer.fullName = req.body.firstName+' '+req.body.lastName;
        dealer.address = req.body.address;
        dealer.mobile = req.body.mobile;
        dealer.email = req.body.email;
        await dealer.save(req.body);
        res.status(200).json(dealer);
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


exports.deleteDealer = async(req, res, next) =>{
    try {
        const {id:dealerID} = req.params;
        const {id:userId, user_type } = req.decoded;
        console.log(dealerID, userId)
        const dealer = await db.Dealer.findById(dealerID);
        console.log(dealer)
        if(user_type <= 2 )
          await dealer.remove()
         else throw new Error('Unauthorized access'); 
        res.status(200).json(dealer)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

