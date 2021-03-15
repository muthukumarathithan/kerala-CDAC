var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type:String,
        required:true,
    },
    password: {
        type:String,
        required:true
    },
        user_type :Number,
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'customers'
        },
    distributor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'distributors'
        },  
    dealer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'dealers'
        },      
    enable :{
        type : Boolean,
        default : true
      },
    login_reset :{
      type : Boolean,
      default : true
    },

    created:{
        type:Date,
        default:Date.now,
    },
   
});

UserSchema.pre('save', async function(next){
    try {
        if(!this.isModified('password')){
            return next();
        }
        const hashed = await bcrypt.hash(this.password, 10)
        this.password = hashed
        return next();
    } catch (error) {
        return next(error)
    }
})

UserSchema.methods.comparePassword = async function(attempt, next){
    try {
               return await bcrypt.compare(attempt, this.password)
    } catch (error) {
        return next(error)
    }
}


module.exports = mongoose.model('users', UserSchema);