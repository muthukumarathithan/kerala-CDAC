var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FenceSchema = new Schema({
    gps_device_id:String,
    district_id:String,
    fence_id:String,
    latitude:Number,
    longitude:Number,
    radius:Number,
    mobile_no:Number,
    address:String,
    createdAt :{
      type : Date,
      default : new Date()
    }
});


module.exports = mongoose.model('fence_details', FenceSchema);
