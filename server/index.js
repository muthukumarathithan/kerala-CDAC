require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const handlers = require('./handlers')
const db = require('./models')
const routes = require('./routes')


const app = express()
const port = 4000;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => res.send('Hello World!'))

app.use('/api/auth', routes.auth);
app.use('/api/polls', routes.poll);
app.use('/api/devices', routes.device);
app.use('/api/distributors', routes.distributor);
app.use('/api/dealers', routes.dealer);
app.use('/api/customers', routes.customer);
app.use('/api/vehicles', routes.vehicle);
app.use('/api/fences', routes.fence);
app.use('/api/reports', routes.report);

app.use(handlers.notFound)
app.use(handlers.errors) 


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
