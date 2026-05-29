const { Router } = require('express');
const controller = require('../controllers/user.controller');
const { verificarUsuarioExiste, verificarUsuariosFollow } = require('../middlewares/user.middleware');
const { validarCreacion, validarActualizacion, validarFollow } = require('../schemas/user.schema');
const { validarRepeticiones } = require('../middlewares/validarUsuario.middleware');

const router = Router();

// USERS
router.get('/', controller.obtenerUsuarios);
router.post('/', validarCreacion,validarRepeticiones, controller.crearUsuario); //json


router.post('/:seguidorNick/follow', validarFollow, verificarUsuariosFollow, controller.seguirUsuario); //json
router.delete('/:seguidorNick/unfollow', validarFollow, verificarUsuariosFollow, controller.dejarDeSeguir);//json

router.get('/:nickName', verificarUsuarioExiste, controller.obtenerUsuario); 
router.put('/:nickName', validarActualizacion,validarRepeticiones,controller.actualizarUsuario); //json
router.delete('/:nickName', verificarUsuarioExiste, controller.eliminarUsuario);

// FOLLOWS
router.post('/follow', validarFollow, verificarUsuariosFollow, controller.seguirUsuario); //json
router.delete('/follow', validarFollow, verificarUsuariosFollow, controller.dejarDeSeguir);//json

// recuerden mandar los json necesarios a la hora de probar cada ruta
module.exports = router;
