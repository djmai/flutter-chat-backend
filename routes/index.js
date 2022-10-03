const {Router} = require('express')

const router = Router();

router.use('/login', require('../routes/auth'));
router.use('/usuarios', require('../routes/usuarios'));
router.use('/mensajes', require('../routes/mensajes'));

module.exports = router;