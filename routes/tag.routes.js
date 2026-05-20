const {Router} = require('express');
const router = Router();
const tagcontroller = require('../controllers/tag.controllers');
const {validarTagId} = require('../middlewares/validarTagId')
const {validarDatosDelTag} = require('../middlewares/validarDatosDelTag')

router.get("/:id",validarTagId,tagcontroller.obtenerTag);

router.post("/",validarDatosDelTag,tagcontroller.crearTag);

module.exports = router