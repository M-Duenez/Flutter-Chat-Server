const express = require('express');
const path = require('path');
require('dotenv').config();

// DB Configuracion de mogoose
const { dbConnection } = require('./database/config.js');

dbConnection();

//App express
const app = express();

// Lectura y parseo del body de una peticion http
app.use(express.json());

//Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket.js');

//path publico
const publicoPath = path.resolve( __dirname, 'public' );
app.use(express.static(publicoPath));


// Definicion de rutas
app.use('/api/login', require('./routes/auth.js'));

server.listen( process.env.PORT, (err) => {

    if (err) throw new Error(err);  //{ return console.log('Error Fatal');}

    console.log('Servidor Corriendo en puerto', process.env.PORT);
});