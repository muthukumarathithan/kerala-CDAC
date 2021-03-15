const db = require('../models');

exports.getDistance = async(req, res, next) =>{
    try {
        const distance = await db.Distance.find({ date : { $gte: new Date(req.body.start_time), $lte: new Date(req.body.end_time) },
        device_id : req.body.device_id});
       res.status(200).json(distance);
    } catch (error) {
        next(error)
    }
}

