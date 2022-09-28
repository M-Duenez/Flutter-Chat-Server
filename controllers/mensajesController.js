
const Mensajes = require('../models/mensaje')

const obtenerChat = async (req, res) =>{
    const miUid = req.uid;
    const mensajeDe = req.params.de;

    const mensajes = await Mensajes.find({
        $or: [{de: miUid, para: mensajeDe}, {de: mensajeDe, para: miUid}]

    })
    .sort({createdAt: 'desc'})
    .limit(30); 

    res.json({
        ok: true,
        // miUid,
        // mensajeDe,
        mensajes
        // msg: 'Crear Usuario!!!!'
    });
}

module.exports = {
    obtenerChat
}