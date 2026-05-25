const { User } = require('../models');

const verificarUsuarioExiste = async (req, res, next) => {
  try {
    const { nickName } = req.params; 
    const usuario = await User.findByPk(nickName);
    if (!usuario)
      return res.status(404).json({ error: `El usuario '${nickName}' no existe` });

    req.usuario = usuario;
    next();
  } catch (error) {   
    res.status(500).json({ error: 'Error al verificar el usuario' });
  }
};

const verificarUsuariosFollow = async (req, res, next) => {
  try {
    const { seguidor, seguido } = req.body;
    const usuarioSeguidor = await User.findByPk(seguidor);
    const usuarioSeguido = await User.findByPk(seguido);

    if (!usuarioSeguidor)
      return res.status(404).json({ error: `El usuario '${seguidor}' no existe` });

    if (!usuarioSeguido)
      return res.status(404).json({ error: `El usuario '${seguido}' no existe` });

    req.usuarioSeguidor = usuarioSeguidor;
    req.usuarioSeguido = usuarioSeguido;
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error al verificar los usuarios' });
  }
};

module.exports = { verificarUsuarioExiste, verificarUsuariosFollow };