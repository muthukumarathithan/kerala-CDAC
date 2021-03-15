const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OptionSchema  = new Schema({
    option:String,
    votes:{
        type : Number,
        default : 0
    }
})

const PollSchema = new Schema({
    question:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    options:[OptionSchema],
    voted:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }]
})

module.exports = mongoose.model('polls', PollSchema);