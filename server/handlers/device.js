const db = require('../models');

exports.showDevices = async(req, res, next) =>{
    try {
        const {id, user_type} = req.decoded;
        var filter = {}
        if(user_type === 2)
          filter = {distributor:id}
          else if(user_type === 3)
            filter = {dealer:id}
            else if(user_type === 4)
              filter = {customer:id}
        const devices = await db.Device.find(filter)
        .populate('distributor')
        .populate('dealer')
        .populate('customer');
        console.log(devices);
        res.status(200).json(devices) 
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.getDevice = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const devices = await db.Device.findById(id)
        .populate('distributor')
        .populate('dealer');
        console.log(devices)
        res.status(200).json(devices)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 



exports.createDevice = async(req, res, next) =>{
    try {
        const {id} = req.decoded;
        const device =  await db.Device.create({
            ...req.body,
            created_by:id,
         });
        res.status(200).json(device);
    } catch (error) {
        error.code = 400;
        next(error)
    }
}

exports.getUserDevices = async(req, res, next) =>{
    try {
       
        const devices = await db.Device.find()
        .populate('customer',['name','id'])
        .populate('dealer',['name','id'])
        .populate('distributor',['name','id'])
        .populate('vehicle',['name','id']);
        res.status(200).json(devices)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 


// exports.updateDevice = async(req, res, next) =>{
//     try {
//         const {id:userId} = req.decoded;
//         const {id:pollId} = req.params;
//         var consumer;
//         const device = await db.Device.findById(pollId);
//         if(!device) throw new Error('No Device found');
//         device.device_id = req.body.device_id;
//         device.sim_no = req.body.sim_no;
//         device.network = req.body.network;
//         device.device_type = req.body.device_type;
//         if(req.body.consumer_type === '1'){
//             consumer = await db.Distributor.findById(req.body.consumer_id);
//             device.distributor = consumer;
//         }
//          else if(req.body.consumer_type === '2'){
//             consumer = await db.Dealer.findById(req.body.consumer_id);
//             device.dealer = req.body.consumer_id;
//          }
//           else if(req.body.consumer_type === '3'){
//             device.customer = req.body.consumer_id; 
//             consumer = await db.Customer.findById(req.body.consumer_id);
//           }
//         consumer.devices = device;
//         await device.save();
//         await consumer.save();
//         res.status(200).json(device);
//        } catch (error) {
//         error.status = 400;
//         next(error)
//     }
// }

exports.updateDevice = async(req, res, next) =>{
    try {
        const {id:userId, user_type} = req.decoded;
        const {id:deviceId} = req.params;
        const device = await db.Device.findById(deviceId);
        if(!device) throw new Error('No Device found');
        if(user_type === 1){
            device.device_id = req.body.device_id;
            device.sim_no = req.body.sim_no;
            device.network = req.body.network;
            device.device_type = req.body.device_type;
        }
        if(user_type === 1 && req.body.distributor)
         device.distributor = req.body.distributor;
        if((user_type === 1 || user_type === 2) && req.body.dealer) 
         device.dealer = req.body.dealer;
        if((user_type === 2 || user_type === 3 ) && req.body.customer) 
         device.customer = req.body.customer;
        await device.save();
        res.status(200).json(device);
       } catch (error) {
        error.status = 400;
        next(error)
    }
}


exports.deleteDevice = async(req, res, next) =>{
    try {
        const {id:deviceID} = req.params;
        const {id:userId, user_type } = req.decoded;
        const device = await db.Device.findById(deviceID);
        if(user_type <= 2 )
          await device.remove()
         else throw new Error('Unauthorized access'); 
        res.status(200).json(device)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 