const {Router} = require('express');
const router = Router();
const tagcontroller = require('../controllers/tag.controllers');

router.get("/",tagcontroller.obtenerTags);

module.exports = router