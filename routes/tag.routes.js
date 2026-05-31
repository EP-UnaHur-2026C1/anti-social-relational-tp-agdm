const {Router} = require('express');
const router = Router();
const tagcontroller = require('../controllers/tag.controllers');
const {validarIdPost} = require("../middlewares/validarIdPost.js");
const {validarIdTag} = require("../middlewares/validarIdTag.js");

router.get("/",tagcontroller.obtenerTags);
router.get("/post/:id",validarIdPost,tagcontroller.obtenerTagsDePost);
router.delete("/:id",validarIdTag,tagcontroller.eliminarTag);

module.exports = router