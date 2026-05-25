const Joi = require('joi');
const { validarUsuario } = require('../middlewares/validarUsuario.middleware');

const crearUsuarioSchema = Joi.object({
  nickName: Joi.string().min(3).max(30).required().messages({
    'string.empty': 'El nickName no puede estar vacío',
    'any.required': 'El nickName es obligatorio'
  }),
  
  email: Joi.string().email().empty().required().messages({
    'string.email': 'El formato del email no es válido',
    'any.required': 'El email es obligatorio',
    'string.empty': 'El email no puede estar vacío'
  }),

  password: Joi.string().min(6).required().messages({
    'string.min': 'La contraseña debe tener al menos 6 caracteres',
    'any.required': 'La contraseña es obligatoria'
  })
});

const actualizarUsuarioSchema = Joi.object({
  email: Joi.string().email().optional(),
  password: Joi.string().min(6).optional()
}).min(1).messages({
  'object.min': 'Debes enviar al menos un campo (email o password) para actualizar'
});

const followSchema = Joi.object({
  seguidor: Joi.string().required(),
  seguido: Joi.string().required()
});

module.exports = {
  validarCreacion: validarUsuario(crearUsuarioSchema),
  validarActualizacion: validarUsuario(actualizarUsuarioSchema),
  validarFollow: validarUsuario(followSchema)
};