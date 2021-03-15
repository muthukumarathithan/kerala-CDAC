const router = require('express').Router();
const handler = require('../handlers');
const auth = require('../middlewares/auth')

router.post('/register', handler.register);

router.post('/login', handler.login);

router.route('/reset_password')
.post(auth, handler.resetPassword)


module.exports = router;