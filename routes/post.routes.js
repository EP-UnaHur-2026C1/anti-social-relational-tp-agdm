const {Router} = require('express');
const router = Router();
const postController = require('../controllers/post.controllers.js');
const {validarDatosPost} = require("../middlewares/validarDatosPost.js")
const {validarIdPost} = require("../middlewares/validarIdPost.js")
const { verificarUsuarioExiste} = require('../middlewares/user.middleware');

router.post("/users/:nickName",verificarUsuarioExiste,validarDatosPost,postController.crearPost);
router.get("/",postController.obtenerPosts);
router.get('/user/:nickName',verificarUsuarioExiste,postController.obtenerPostPorUsuario);
router.get("/:id",validarIdPost,postController.obtenerPostPorId);
router.put("/:id",validarIdPost,validarDatosPost,postController.actualizarPost);
router.delete("/:id",validarIdPost,postController.eliminarPost);


module.exports = router