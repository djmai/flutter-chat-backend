const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
  // Leer el token
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'No hay un token en la petición'
    });
  }

  try {

    const { uuid } = jwt.verify(token, process.env.JWT_KEY);
    req.uuid = uuid;

    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({
      ok: false,
      msg: 'Token no válido'
    });
  }

}

module.exports = {
  validarJWT
}