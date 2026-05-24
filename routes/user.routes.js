const { Router } = require('express');
const controller = require('../controllers/user.controller');
const { verificarUsuarioExiste, verificarUsuariosFollow } = require('../middlewares/user.middleware');
const { validarCreacion, validarActualizacion, validarFollow } = require('../schemas/user.schema');

const router = Router();


router.get('/', controller.obtenerUsuarios);
router.post('/', validarCreacion, controller.crearUsuario); //json


router.post('/follow', validarFollow, verificarUsuariosFollow, controller.seguirUsuario); //json
router.delete('/follow', validarFollow, verificarUsuariosFollow, controller.dejarDeSeguir);//json

router.get('/:nickName', verificarUsuarioExiste, controller.obtenerUsuario); 
router.put('/:nickName', verificarUsuarioExiste, validarActualizacion, controller.actualizarUsuario); //json
router.delete('/:nickName', verificarUsuarioExiste, controller.eliminarUsuario);
// recuerden mandar los json necesarios a la hora de probar cada ruta
module.exports = router;
