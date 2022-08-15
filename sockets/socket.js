const {io} = require('../index');

//Mensaje socket
io.on('connection', client => {
    console.log('Cliente Conectado');
    client.on('disconnect', () => {
        console.log('CLIENTE DESCONECTADO');
    });
    client.on('mensaje', (payload) =>{
        console.log('Mensaje', payload);

        io.emit('mensaje', {admin: 'Nuevo mensaje'});

    });
});