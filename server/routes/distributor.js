const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')


router.route('/')
.get(handler.showDistributors)
.post(auth, handler.createDistributor)

router.route('/user')
.post(auth, handler.getUserPolls)

router.route('/:id')
.get(auth, handler.getDistributor)
.post(auth, handler.updateDistributor)
.delete(auth, handler.deleteDistributor)

module.exports = router;


