const { User } = require('../models');

const verificarUsuarioExiste = async (req, res, next) => {
  try {
    const { nickName} = req.params; 
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
    const { seguidorNick } = req.params; 
    const { seguir } = req.body;        

    const seguidor = await User.findByPk(seguidorNick);
    const seguido = await User.findByPk(seguir);
    if (!seguidor || !seguido) {
      return res.status(404).json({ error: 'Uno o ambos usuarios no existen.' });
    }
    req.usuarioSeguidor = seguidor;
    req.usuarioSeguido = seguido;

    next();
  } catch (error) {
    res.status(500).json({ error: 'Error al validar usuarios' });
  }
};

module.exports = { verificarUsuarioExiste, verificarUsuariosFollow };