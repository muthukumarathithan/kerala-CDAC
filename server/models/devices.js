const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeviceSchema = new Schema({
    device_id:String,
    sim_no:String,
    network:String,
    device_type:String,
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
    vehicle:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'vehicles'
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    created:{
        type:Date,
        default:Date.now,
    },
   
})

module.exports = mongoose.model('devices', DeviceSchema);