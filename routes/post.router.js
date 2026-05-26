const express = require('express');
const router = express.Router();

const {
  obtenerPosts,
  obtenerPostPorId,
  obtenerPostPorUsuario,
  crearPost,
  actualizarPost,
  eliminarPost
} = require('../controllers/post.controller');

const {
  crearPostConValidacion,
  actualizarPostConValidacion
} = require('../schemas/post.schema');

router.post('/', crearPostConValidacion, crearPost);
router.get('/', obtenerPosts);
router.get('/user/:userNickname', obtenerPostPorUsuario);
router.get('/:id', obtenerPostPorId);
router.put('/:id', actualizarPostConValidacion, actualizarPost);
router.delete('/:id', eliminarPost);

module.exports = router;