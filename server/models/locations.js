var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = new Schema({
    box_status:  String ,
    device_id : String,
    latitude :Number,
    longitude : Number,
    coordinal_head: String ,
    live_history_packet : String,
    device_time:  Date ,
    device_time_ISO:  Date ,
    l_device_timeStamp:  Number ,
    l_created_date : Date,
    l_created_date_timeStamp : Number,
    lat_direction: String,
    longitude_direction: String,
    no_of_satellites: Number,
    external_bt_voltage: Number,
    gsm_signal_strength: String,
    ignition_status: Boolean,
    external_bt_voltage: String,
    internal_bt_voltage: String,
    gps_odometer:  Number ,
    speed : Number,
}, { toObject: { virtuals: true } }
);

module.exports = mongoose.model('location_history', LocationSchema);
