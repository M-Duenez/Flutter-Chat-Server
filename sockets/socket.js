const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index');
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socketController')

//Mensaje socket
io.on('connection', client => {
    console.log('Cliente Conectado');

    //console.log(client.handshake.headers['x-token']);
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);

    //console.log(valido, uid);

    //Verificacion de la autenticacion del cliente 
    if (!valido ) {
        return client.disconnect();
    }
    // Parte de cliente auteticado correctamente 
    // console.log('CLIENTE AUTENTICADO');
    usuarioConectado(uid);

    // Ingresar a un usuario a una sala en particular
    // sala global, client.id, uid-usuario
    client.join(uid);
    // client.to(uid).emit('')

    // escuchar cliente mensaje personal
    client.on('mensaje-personal', async (payload) =>{
        console.log(payload)
        // TODO:: grabar mensaje
        await grabarMensaje(payload);

        io.to(payload.para).emit('mensaje-personal', payload);
    });


    client.on('disconnect', () => {
        console.log('CLIENTE DESCONECTADO');
        usuarioDesconectado(uid);
    });
    client.on('mensaje', (payload) =>{
        console.log('Mensaje', payload);

        io.emit('mensaje', {admin: 'Nuevo mensaje'});

    });
});