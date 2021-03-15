const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')


router.route('/')
.get(auth, handler.showCustomers)
.post(auth, handler.createCustomer)

router.route('/user')
.post(auth, handler.getUserPolls)

router.route('/:id')
.get(auth, handler.getCustomer)
.post(auth, handler.updateCustomer)
.delete(auth, handler.deleteCustomer)

module.exports = router;


