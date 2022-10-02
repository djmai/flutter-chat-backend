/**
 * path: api/login
 */

const { Router } = require('express');
const { check } = require('express-validator');

const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/new', [
  check('nombre', 'El nombre es obligatorio').not().trim().escape().isEmpty(),
  check('email', 'El email es obligatorio').not().trim().escape().isEmpty().isEmail().normalizeEmail(),
  check('password', 'El password es obligatorio').not().trim().escape().isEmpty().isLength({ min: 8 }).withMessage('Debe tener al menos 8 caracteres de longitud'),
  validarCampos
], crearUsuario);

router.post('/', [
  check('email', 'El email es obligatorio').not().trim().escape().isEmpty().isEmail().normalizeEmail(),
  check('password', 'El password es obligatorio').not().trim().escape().isEmpty().isLength({ min: 8 }).withMessage('Debe tener al menos 8 caracteres de longitud'),
  validarCampos
], login);

router.get('/renew', [validarJWT], renewToken);

module.exports = router;