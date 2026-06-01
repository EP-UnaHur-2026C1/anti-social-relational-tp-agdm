const {Router} = require('express');
const router = Router();
const {validarIdPost} = require("../middlewares/validarIdPost.js")
const postImageController = require("../controllers/postImage.controller.js")
const {validarIdImagen} = require("../middlewares/validarIdImagen.js")


router.get("/",postImageController.obtenerTodasLasImagenes);
router.get("/post/:id",validarIdPost,postImageController.obtenerImagenesDelPost);
router.delete("/:id",validarIdImagen,postImageController.eliminarImagen);

module.exports = router