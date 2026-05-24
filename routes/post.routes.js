const {Router} = require('express');
const router = Router();
const postController = require('../controllers/post.controllers.js');
const {validarDatosPost} = require("../middlewares/validarDatosPost.js")
const {validarIdPost} = require("../middlewares/validarIdPost.js")

router.post("/",validarDatosPost,postController.crearPost);

router.get("/:id",validarIdPost,postController.obtenerPost);

router.get("/",postController.obtenerPosts);


module.exports = router