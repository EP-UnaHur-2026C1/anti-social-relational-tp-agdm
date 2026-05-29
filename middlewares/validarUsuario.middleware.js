const { User } = require('../models');
const { Op } = require('sequelize');

const validarUsuario = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((d) => d.message);
    return res.status(400).json({ errors: messages });
  }
  next();
};

const validarRepeticiones = async (req, res, next) => {
  try {
    const { nickName, email } = req.body;
    const nickNameUrl = req.params.nickName; 
    const esActualizacion = !!nickNameUrl;

    if (esActualizacion) {
      const usuario = await User.findByPk(nickNameUrl);
      if (!usuario) {
        return res.status(404).json({ error: `El usuario '${nickNameUrl}' no existe.` });
      }
      req.usuario = usuario;
    }

    if (nickName) {
        const existeNick = await User.findOne({ where: { nickName } });
        if (existeNick) {
          return res.status(400).json({ error: 'El nombre de usuario ya está en uso.' });
        }
    }
    if (email) {
      let existeEmail;
      if (esActualizacion) {
        existeEmail = await User.findOne({ 
          where: { 
            email: email, 
            nickName: { [Op.ne]: req.usuario.nickName } 
          } 
        });
      } else {
          existeEmail = await User.findOne({ 
          where: { email: email } 
        });
      }
      if (existeEmail) {
        return res.status(400).json({ error: 'El correo electrónico ya se encuentra en uso por otro usuario.' });
      }
    }
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor al verificar los datos.' });
  }
};
module.exports = {validarUsuario,validarRepeticiones}
