const {Router} = require('express')

const router = Router();

router.use('/login', require('../routes/auth'));

module.exports = router;