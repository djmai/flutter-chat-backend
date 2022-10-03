const { response } = require('express');
const Mensaje = require('../models/mensaje');

const obtenerChat = async (req, res = response) => {

  const miUUID = req.uuid;
  const mensajesDe = req.params.de;

  const desde = Number(req.query.desde) || 0;

  const last30 = await Mensaje
    .find({ $or: [{ de: miUUID, para: mensajesDe }, { de: mensajesDe, para: miUUID }] })
    .sort({ createdAt: 'desc' })
    // .skip(desde)
    .limit(30)

  res.json({
    ok: true,
    msg: 'obtenerChat',
    mensajes: last30
  })
}

module.exports = {
  obtenerChat
}