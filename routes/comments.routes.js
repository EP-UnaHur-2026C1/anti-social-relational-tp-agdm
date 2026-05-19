const express = require('express');
const router = express.Router();
const { obtenerComentarios, crearComentario, actualizarComentario, eliminarComentario } = require('../controllers/comment.controller');
const { crearComentarioSchema, actualizarComentarioSchema } = require('../schemas/comment.schema');
const validate = require('../middlewares/validate.middleware');

router.post('/', validate(crearComentarioSchema), crearComentario);
router.get('/post/:postId', obtenerComentarios);
router.put('/:id', validate(actualizarComentarioSchema), actualizarComentario);
router.delete('/:id', eliminarComentario);

module.exports = router;