const {Router} = require('express');
const router = Router();
const postController = require('../controllers/post.controllers.js');
const {validarDatosPost} = require("../middlewares/validarDatosPost.js")
const {validarIdPost} = require("../middlewares/validarIdPost.js")
const { verificarUsuarioExiste} = require('../middlewares/user.middleware');

router.post("/users/:nickName",verificarUsuarioExiste,validarDatosPost,postController.crearPost)
router.delete("/:id/users/:nickName",verificarUsuarioExiste,validarIdPost,postController.eliminarPost)
router.get("/:id",validarIdPost,postController.obtenerPost);
router.get("/",postController.obtenerPosts);
router.put("/:id",validarIdPost,validarDatosPost,postController.actualizarPost)


module.exports = router