const db = require('../models');

exports.getPing = async(req, res, next) =>{
    try {
        const pings = await db.Location.aggregate(         [
            {
              $match:
                {
                  "device_time" : {$gte: new Date(req.body.startDate), $lte: new Date(req.body.endDate)},
                  "device_id" : req.body.device_id,
               }
            },
            {
                     "$project": {
                  "h":{"$hour":{date:'$device_time',timezone:'Asia/Kolkata'}},
                  "device_id":1 }
             },
             { "$group":{
                   "_id": { "device_id":"$device_id","hour":"$h"},
                   "total":{ "$sum": 1}
             }
             },
             { "$group":{
                   "_id": "$_id.device_id",
                   "ping":{$push: {
                               hour:"$_id.hour",
                               total:"$total",
 
                           }},
               },
             }]);

        
        res.status(200).json(pings);
    } catch (error) {
         next(error)
    }
}

