const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async ( req, res = response) =>{  

    const { email, password } = req.body;
    try {

        const existeEmail = await Usuario.findOne({email});

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya Existe'
            });
        }

        const  usuario = new Usuario(req.body);
        //Ecriptar contrasenia
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();

        //Generar mi JWT
        const token = await generarJWT(usuario.id, usuario.email);
        
        res.json({
            ok: true,
            usuario,
            token
            // msg: 'Crear Usuario!!!!'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con administrador'
        });
    }
      
}

const login = async(req, res = response) =>{

    const { email, password } = req.body;

    try {
        const usuarioDB = await Usuario.findOne({email});
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'Email no Encontrado'
            });
        }

        //Validar Password
        const validPassword = bcrypt.compareSync (password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no es valido'
            });
        }

        //Generar JWT 
        const token = await generarJWT(usuarioDB.id, usuarioDB.email);
        res.json({
            ok: true,
            usuario: usuarioDB,
            token
            // msg: 'Crear Usuario!!!!'
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hable con administrador'
        });
    }
    
};

const renewToken = async(req, res = response ) =>{

    const  uid  = req.uid;
    const {email} = req.body;

    //console.log(email);
    
    //Generar JWT 
    const token = await generarJWT(uid, email);
    //Busqueda de usuario por ID
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        usuario,
        token
        // uid: req.uid
    });
};

module.exports = { crearUsuario, login, renewToken };