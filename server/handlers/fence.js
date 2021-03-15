const db = require('../models');
const moment = require('moment');



exports.showCustomerFences = async(req, res, next) =>{
    try {
        console.log(req.decoded);
        
        const fencelist = await db.Fence.find({});
        var GeoFenceList = await fencelist.map((item)=>{
               return {
                createdAt : moment(item.createdAt).format('DD-MMM-YYYY hh:mm:ss A'),
                area_id:item.area_id,
                district_id:item.district_id,
                latitude:item.latitude,
                longitude:item.longitude,
                radius:item.radius,
                address:item.address,
                mobile_no:item.mobile_no,
              }
            });
           res.status(200).json({
            GeoFenceList:GeoFenceList
           })

    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

