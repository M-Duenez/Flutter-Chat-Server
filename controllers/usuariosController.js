const {response} = require('express')
const Usuario = require('../models/usuario')

const getUsuarios = async (req, res = response) =>{

    const desde = Number(req.query.desde) || 0
    // console.log(desde)

    //{ok: true, msg: lista de usuarios}
    const usuario = await Usuario
        .find({_id: {$ne: req.uid}})
        .sort('-online')
        .skip(desde)
        .limit(20)

    res.json({
        ok: true,
        usuario
    });
}

module.exports = {getUsuarios}