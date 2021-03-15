const db = require('../models')
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next)=>{
    try {
        const user = await db.User.create(req.body);
        const {id, username, user_type} = user;
        const token = jwt.sign({id, username, user_type, customer_id},'AvaAs140')
        res.status(200).json({
            id,
            username,
            user_type,
            token,
          
        });
    } catch (error) {
        if(error.code === 11000) {
            error.message = "Username already taken"
         }
         next(error);
    }
}

exports.resetPassword = async (req, res, next)=>{
    try {
        console.log(req.decoded);
        const {user_id} = req.decoded;

        const user = await db.User.findById(user_id);
        user.password = req.body.password;
        user.login_reset = false;
        await user.save();
        const {id, username, user_type, customer:customer_id} = user;
        const token = jwt.sign({id, username, user_type, customer_id},'AvaAs140')

        res.status(200).json({
          status:0,
          msg:'Password Changed successfully'
            
        });


    } catch (error) {
        if(error.code === 11000) {
            error.message = "Username already taken"
         }
         next(error);
    }
}

exports.login = async (req, res, next)=>{
    try {
        const user = await db.User.findOne({username:req.body.username})
        .populate('customer')
        .populate('dealer')
        .populate('distributor');

         
        const valid = await user.comparePassword(req.body.password)
        if(valid){
            const {id:user_id, username, user_type, login_reset} = user;

            if(user_type === 2)
              var { id, first_name , last_name, email, mobile} = user.distributor;
              else if(user_type === 3)
              var { id, first_name , last_name, email, mobile} = user.dealer;
               else if(user_type === 4)
                 var { id, first_name , last_name, email, mobile} = user.customer;
             
            console.log(first_name, last_name);
            const token = jwt.sign({id, username, user_type, user_id},'AvaAs140')
            res.status(200).json({
                id,
                username,
                user_type,
                token,
                login_reset,
                first_name,
                last_name,
                email,
                mobile_no:mobile,
                user_id
                 })
        }
        else{
            throw new Error('Invalid Username/Password')
        }
    } catch (error) {
        next(error)
    }
}

