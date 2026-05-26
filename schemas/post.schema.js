const Joi = require('joi');

const crearPostSchema = Joi.object({
  description: Joi.string()
    .trim()
    .min(1)
    .max(1000)
    .required()
    .messages({
      'string.base': 'La descripción debe ser un texto',
      'string.empty': 'La descripción no puede estar vacía',
      'string.min': 'La descripción debe tener al menos 1 carácter',
      'string.max': 'La descripción no puede superar los 1000 caracteres',
      'any.required': 'La descripción es obligatoria'
    }),

  userNickname: Joi.string()
    .trim()
    .min(1)
    .max(50)
    .required()
    .messages({
      'string.base': 'El nickname del usuario debe ser un texto',
      'string.empty': 'El nickname del usuario no puede estar vacío',
      'string.min': 'El nickname del usuario debe tener al menos 1 carácter',
      'string.max': 'El nickname del usuario no puede superar los 50 caracteres',
      'any.required': 'El nickname del usuario es obligatorio'
    })
});

const actualizarPostSchema = Joi.object({
  description: Joi.string()
    .trim()
    .min(1)
    .max(1000)
    .required()
    .messages({
      'string.base': 'La descripción debe ser un texto',
      'string.empty': 'La descripción no puede estar vacía',
      'string.min': 'La descripción debe tener al menos 1 carácter',
      'string.max': 'La descripción no puede superar los 1000 caracteres',
      'any.required': 'La descripción es obligatoria'
    })
});

const crearPostConValidacion = (req, res, next) => {
  const { error } = crearPostSchema.validate(req.body, {
    abortEarly: false
  });

  if (error) {
    return res.status(400).json({
      error: error.details.map((detail) => detail.message)
    });
  }

  next();
};

const actualizarPostConValidacion = (req, res, next) => {
  const { error } = actualizarPostSchema.validate(req.body, {
    abortEarly: false
  });

  if (error) {
    return res.status(400).json({
      error: error.details.map((detail) => detail.message)
    });
  }

  next();
};

module.exports = {
  crearPostConValidacion,
  actualizarPostConValidacion
};