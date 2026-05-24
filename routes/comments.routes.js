const express = require('express');
const router = express.Router();
const { obtenerComentarios, crearComentario, actualizarComentario, eliminarComentario } = require('../controllers/comment.controller');
const { crearComentarioConValidacion, actualizarComentarioConValidacion } = require('../schemas/comment.schema');

router.post('/', crearComentarioConValidacion, crearComentario);
router.get('/post/:postId', obtenerComentarios);
router.put('/:id', actualizarComentarioConValidacion, actualizarComentario);
router.delete('/:id', eliminarComentario);

module.exports = router;