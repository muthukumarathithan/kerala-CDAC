const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    line1:String,
    line2:String,
    city:String,
    state:String,
    country:String,
    zip:String
})

const DistributorSchema = new Schema({
   firstName:String,
   lastName:String,
   full_name:String, 
   email:String,
   address:AddressSchema,
   mobile:String,
   created_by:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'users'
    },
   created:{
        type:Date,
        default:Date.now,
    },
   
})

module.exports = mongoose.model('distributors', DistributorSchema);