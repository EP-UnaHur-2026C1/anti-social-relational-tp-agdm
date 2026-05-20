const {Router} = require('express');
const router = Router();
const tagcontroller = require('../controllers/tag.controllers.js');
const validarTagPorId = require('../middlewares/validarTagId.js')

router.get("/:id",validarTagPorId,tagcontroller.obtenerTag);