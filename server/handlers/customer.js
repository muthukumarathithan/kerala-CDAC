const db = require('../models');

exports.showCustomers = async(req, res, next) =>{
    try {
        const {id, user_type} = req.decoded;
        var filter = {}
        if(user_type === 2)
          filter = {distributor:id}
          else if(user_type === 3)
            filter = {dealer:id}
            else if(user_type === 4)
              filter = {customer:id}           
        const customers = await db.Customer.find(filter)
        .populate('dealer')
        .populate('distributor');
        res.status(200).json(customers)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 

exports.getCustomer = async(req, res, next) =>{
    try {
        const {id} = req.params;
        const customer = await db.Customer.findById(id)
        .populate('dealers')
        .populate('distributors')
        .populate('vehicles');
        res.status(200).json(customer)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 



exports.createCustomer = async(req, res, next) =>{
    try {
        const {id, user_type} = req.decoded;
        if(user_type === 2)
          req.body.distributor = id;
          else if(user_type === 3)
            req.body.dealer = id;
         const customer =  await db.Customer.create({
            ...req.body,
            created_by:id,
         });
         const user_data = {
             username:req.body.mobile,
             password:req.body.mobile,
             user_type:4,
             customer:customer
         }
        const user = await db.User.create(user_data);
        res.status(200).json(customer);
    } catch (error) {
        if(error.code === 11000) {
            error.message = "Username already taken"
         }
        next(error)
    }
}

exports.updateCustomer = async(req, res, next) =>{
    try {
        const customer = await db.Customer.findById(req.params.id);
        if(!customer) throw new Error('No Customer found');
        customer.firstName = req.body.firstName;
        customer.lastName = req.body.lastName;
        customer.fullName = req.body.firstName+' '+req.body.lastName;
        customer.address = req.body.address;
        customer.mobile = req.body.mobile;
        customer.email = req.body.email;
        await customer.save(req.body);
        res.status(200).json(customer);
    } catch (error) {
        error.code = 400;
        next(error)
    }
}

exports.deleteCustomer = async(req, res, next) =>{
    try {
        const {id:customerID} = req.params;
        const {id:userId, user_type } = req.decoded;
        const customer = await db.Customer.findById(customerID);
        if(user_type <= 3 )
          await customer.remove()
         else throw new Error('Unauthorized access'); 
        res.status(200).json(customer)
    } catch (error) {
        error.status = 400;
        next(error)
    }
} 