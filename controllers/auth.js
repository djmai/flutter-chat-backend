const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

  const { email, password } = req.body;

  try {

    const existeEmail = await Usuario.findOne({ email });
    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: 'El correo ya esta registrado'
      });
    }

    const usuario = new Usuario(req.body);

    // Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    // Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      msg: 'Usuario creado correctamente',
      usuario,
      token
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    const usuarioDB = await Usuario.findOne({ email });
    if (!usuarioDB) {
      res.status(404).json({
        ok: false,
        msg: 'Email no válido',
      });
    }

    // Validar password
    const validPassword = bcrypt.compareSync(password, usuarioDB.password);
    if (!validPassword) {
      res.status(400).json({
        ok: false,
        msg: 'Email o Contraseña incorrectos'
      })
    }

    // Generar JWT
    const token = await generarJWT(usuarioDB.id);

    res.json({
      ok: true,
      msg: 'login',
      usuario: usuarioDB,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}


const renewToken = async (req, res = response) => {

  const { uuid } = req;

  try {

    // Generar nuevo JWT
    const token = await generarJWT(uuid);

    // Obtener el usuario por el uuid
    const usuario = await Usuario.findById(uuid);

    res.json({
      ok: true,
      msg: 'renew',
      usuario,
      token
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    })
  }
}

module.exports = {
  crearUsuario,
  login,
  renewToken
}