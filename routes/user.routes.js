const { Router } = require('express');
const controller = require('../controllers/user.controller');
const { verificarUsuarioExiste, verificarUsuariosFollow } = require('../middlewares/user.middleware');
const { validarRepeticiones } = require('../middlewares/validarUsuario.middleware');
const { validarCreacion, validarActualizacion, validarFollow} = require('../schemas/user.schema');

const postController = require('../controllers/post.controllers.js');
const {validarDatosPost} = require("../middlewares/validarDatosPost.js")
const {validarIdPost} = require("../middlewares/validarIdPost.js")

const router = Router();

// USERS
router.get('/', controller.obtenerUsuarios);
router.post('/', validarRepeticiones, validarCreacion, controller.crearUsuario); //json
router.get('/:nickName', verificarUsuarioExiste, controller.obtenerUsuario); 
router.put('/:nickName', verificarUsuarioExiste, validarActualizacion, controller.actualizarUsuario); //json
router.delete('/:nickName', verificarUsuarioExiste, controller.eliminarUsuario);

// FOLLOWS
router.post('/follow', validarFollow, verificarUsuariosFollow, controller.seguirUsuario); //json
router.delete('/follow', validarFollow, verificarUsuariosFollow, controller.dejarDeSeguir);//json

// recuerden mandar los json necesarios a la hora de probar cada ruta
module.exports = router;
