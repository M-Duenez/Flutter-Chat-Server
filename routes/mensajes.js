/*/
    path: api/mensajes
*/

const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt.js');
const {obtenerChat} = require('../controllers/mensajesController')
 
const router = Router();
// , validarJWT
router.get('/:de', validarJWT, obtenerChat)

// router.get('/')

module.exports = router;