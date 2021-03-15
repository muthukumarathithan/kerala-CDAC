const db = require('../models');

exports.showDistributors = async(req, res, next) =>{
    try {
        console.log(req.body);
        
        const devices = await db.Distributor.find()
        .populate('customers',['name','id'])
        .populate('dealers',['name','id'])
        .populate('distributors',['name','id'])
        .populate('vehicles',['name','id']);
        res.status(200).json(devices)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.getDistributor = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const distributor = await db.Distributor.findById(id)
        res.status(200).json(distributor)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 


exports.deleteDistributor = async(req, res, next) =>{
    try {
        const {id:distributorID} = req.params;
        const {id:userId, user_type } = req.decoded;
        console.log(distributorID, userId)
        const distributor = await db.Distributor.findById(distributorID);
        if(user_type === 1 )
          await distributor.remove()
         else throw new Error('Unauthorized access'); 
        res.status(200).json(distributor)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.createDistributor = async(req, res, next) =>{
    try {
        const {id} = req.decoded;
        console.log(req.body);
        const distributor =  await db.Distributor.create({
            ...req.body,
            created_by:id,
         });

         const user_data = {
            username:req.body.mobile,
            password:req.body.mobile,
            user_type:2,
            distributor:distributor
        }
       const user = await db.User.create(user_data);
        res.status(200).json(distributor);
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

exports.updateDistributor = async(req, res, next) =>{
    try {
        const distributor = await db.Distributor.findById(req.params.id);
        if(!distributor) throw new Error('No Poll found');
        distributor.firstName = req.body.firstName;
        distributor.lastName = req.body.lastName;
        distributor.fullName = req.body.firstName+' '+req.body.lastName;
        distributor.address = req.body.address;
        distributor.mobile = req.body.mobile;
        distributor.email = req.body.email;
        await distributor.save(req.body);
        res.status(200).json(distributor);
    } catch (error) {
        error.code = 400;
        next(error)
    }
}