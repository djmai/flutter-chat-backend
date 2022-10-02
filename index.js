const express = require('express')
const path = require('path')
require('dotenv').config()

// DB Config
const { dbConnection } = require('./database/config');
dbConnection();

// PORT
PORT = process.env.PORT || 3000;

// App Express
const app = express()

// Lectura y parseo del body
app.use(express.json());

// Node Server
const server = require('http').createServer(app)

// Socket.io
module.exports.io = require('socket.io')(server);
require('./sockets/socket');

// Path público
const publicPath = path.resolve(__dirname, 'public')

app.use(express.static(publicPath))

// Routes
app.use('/api', require('./routes/index'));

server.listen(PORT, (err) => {
  if (err) throw new Error(err);
  console.log(`🚡 Servidor corriendo en el puerto`, PORT)
})
