const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')


router.route('/')
.get(auth, handler.showDevices)
.post(auth, handler.createDevice)

router.route('/user')
.post(auth, handler.getUserDevices)

router.route('/:id')
.get(auth, handler.getDevice)
.post(auth, handler.updateDevice)
.delete(auth, handler.deleteDevice)

module.exports = router;


