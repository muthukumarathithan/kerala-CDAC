const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')


router.route('/')
.get(auth, handler.showDealers)
.post(auth, handler.createDealer)

router.route('/user')
.post(auth, handler.getUserPolls)

router.route('/:id')
.get(auth, handler.getDealer)
.post(auth, handler.updateDealer)
.delete(auth, handler.deleteDealer)

module.exports = router;


