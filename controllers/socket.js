const Mensaje = require('../models/mensaje');
const Usuario = require('../models/usuario');

const usuarioConectado = async (uuid = '') => {
  const usuario = await Usuario.findById(uuid);
  usuario.online = true;
  await usuario.save();
  return usuario;
}

const usuarioDesconectado = async (uuid = '') => {
  const usuario = await Usuario.findById(uuid);
  usuario.online = false;
  await usuario.save();
  return usuario;
}

const grabarMensaje = async (payload) => {

  /**
   * payload: {
   *  de:'',
   *  para:'',
   *  mensaje:''
   * }
   */

  try {
    const mensaje = Mensaje(payload);
    await mensaje.save();
    
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = {
  usuarioConectado,
  usuarioDesconectado,
  grabarMensaje
}