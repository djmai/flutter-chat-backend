const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index')
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');

// Mensajes de Sockets
io.on('connection', (client) => {
  console.log('Cliente conectado');

  const [valido, uuid] = comprobarJWT(client.handshake.headers['x-token']);

  // Verificar autenticación
  if (!valido) return client.disconnect();

  // Cliente autenticado
  usuarioConectado(uuid);

  // Escuchar de cliente mensaje-personal
  client.on('mensaje-personal', async (payload) => {
    // console.log(payload)
    // TODO: Grabar mensaje
    await grabarMensaje(payload);
    io.to(payload.para).emit('mensaje-personal', payload);
  })

  // Ingresar al usuario a una sala en particular
  // sala global, client.id
  client.join(uuid);

  client.on('disconnect', () => {
    usuarioDesconectado(uuid);
  });

  // client.on('mensaje', (payload) => {
  //   console.log(payload)
  //   io.emit('mensaje', { admin: 'nuevo mensaje' })
  // })

});