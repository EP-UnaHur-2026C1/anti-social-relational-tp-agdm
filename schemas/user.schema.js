const Joi = require('joi');
const {validarUsuario} = require('../middlewares/validarUsuario.middleware');


const crearUsuarioSchema = Joi.object({
  nickName: Joi.string().min(3).max(30).required().messages({
    'string.min':'El nombre de usuario debe tener al menos 3 caracteres',
    'string.max':'El nombre de usuario es muy largo',
    'string.empty': 'El nickName no puede estar vacío',
    'any.required': 'El nickName es obligatorio'
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'El formato del email no es válido',
    'any.required': 'El email es obligatorio',
    'any.unique': 'no puede ser repetido'
  }),
  password: Joi.string().min(6).required().messages({
    'string.min':'La contraseña debe tener al menos 6 caracteres',
    'any.required': 'La contraseña es obligatoria'
  })
});

const actualizarUsuarioSchema = Joi.object({
  email: Joi.string().email().optional().messages({
    'string.email':'El formato del mail es incorrecto',
    'string.empty':'El nuevo mail no puede estar vacio'
  }),
  password: Joi.string().min(6).optional().messages({
    'string.empty': 'La nueva contraseña no puede estar vacía',
    'string.min': 'La nueva contraseña debe tener al menos 6 caracteres'})
}).min(1).messages({
  'object.unknown': 'No se permite modificar el nombre de usuario u otros campos no autorizados.',
  'object.min': 'Debes enviar al menos un campo (email o password) para actualizar'
});

const followSchema = Joi.object({
  seguir: Joi.string().required().messages({
    'string.empty':'No has ingresado ningun Usuario',
    'any.required':'Es obligatorio ingresar un usuario',
  })}).messages({
     'object.unknown':'Ingresaste un campo no autorizado'
});


module.exports = {
  validarCreacion: validarUsuario(crearUsuarioSchema),
  validarActualizacion: validarUsuario(actualizarUsuarioSchema),
  validarFollow: validarUsuario(followSchema)
};