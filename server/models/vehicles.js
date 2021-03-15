const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VehicleSchema = new Schema({
    box_status: Boolean,
    cardinal_head: String,
    device_time: Date,
    l_created_date: Date,
    external_bt_voltage: String,
    gps_odometer: String,
    gps_validity: String,
    gsm_signal_strength: String,
    ignition_status:Boolean,
    internal_bt_status: String,
    lat_direction: String,
    latitude: Number,
    lon_direction: String,
    longitude: Number,
    no_of_satellites: Number,
    speed: Number,
    geo_code:Number,
    vehicle_delete_status:Boolean,
    vehicle_status:String,
    vehicle_model: String,
    vehicle_reg_no: String,
    rto:String,
    speed_sms_time:Date,
    battery_sms_time:Date,
    garage: {
      type:Boolean,
      default:false
    },
    garage_date:Date,
    device_id:String,
    driver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'drivers'
    },
    vehicle_type:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'vehicle_types'
    },
    distributor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'distributors'
    },
    dealer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'dealers'
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customers'
    },
    device:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'devices'
    }
   
})

module.exports = mongoose.model('vehicles', VehicleSchema);