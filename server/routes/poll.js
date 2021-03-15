const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')


router.route('/')
.get(handler.showPolls)
.post(auth, handler.createPoll)

router.route('/user')
.post(auth, handler.getUserPolls)

router.route('/:id')
.get(auth, handler.getPoll)
.post(auth, handler.vote)
.delete(auth, handler.deletePoll)

module.exports = router;


