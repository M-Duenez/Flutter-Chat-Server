/*/
    path: api/usuarios
*/
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const { getUsuarios } = require('../controllers/usuariosController')
 
const router = Router();
// , validarJWT
router.get('/', validarJWT, getUsuarios)

// router.get('/')

module.exports = router;
