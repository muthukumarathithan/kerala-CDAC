const mongoose = require('mongoose');
const port = process.env.DB_PORT;
const password = process.env.PASSWORD;
const username = process.env.USERNAME;
const db_name = process.env.DB_NAME;
const db_host = process.env.HOST;

mongoose.set('debug',true);
mongoose.Promise = global.Promise;


/*mongoose.connect(`mongodb+srv://muthukumarathithan:muthu123@cluster0-ockql.mongodb.net/<dbname>?retryWrites=true&w=majority`,{useNewUrlParser: true , useUnifiedTopology: true})
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));*/

//mongoose.connect(`mongodb://kerala:keras140@34.93.249.144:27017/keralaDB`,{useNewUrlParser: true})

  mongoose.connect(`mongodb://localhost:27017/keralaDB`,{useNewUrlParser: true})
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
  module.exports.Vehicle = require('./vehicles.js');
