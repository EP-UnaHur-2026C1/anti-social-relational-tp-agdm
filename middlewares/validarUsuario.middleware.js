const { User } = require('../models');

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

    const existeEmail = await User.findOne({ where: { email } });
    if (existeEmail) {
      return res.status(400).json({ 
        error: 'El correo electrónico ya se encuentra en uso por otro usuario.' 
      });
    }

    const existeNick = await User.findOne({ where: { nickName } });
    if (existeNick) {
      return res.status(400).json({ 
        error: 'Nombre de usuario ya está en uso.' 
      });
    }

    next();
  } catch (error) {
    res.status(500).json({ error: 'Error del servidor al verificar los datos.'});
  }
};



module.exports = { validarUsuario, validarRepeticiones };