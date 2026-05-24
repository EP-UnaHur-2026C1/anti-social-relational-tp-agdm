const Joi = require('joi');
const validate = require('../middlewares/validate.middleware');

const crearComentarioSchema = Joi.object({
    contenido: Joi.string().min(1).max(500).required().messages({
        'string.base': 'El contenido del comentario no puede estar vacio.',
        'string.empty': 'El contenido es obligatorio.',
        'string.max': 'El contenido no puede exceder los 500 caracteres.',
        'any.required': 'El contenido del comentario es obligatorio.'
    }),
    postId: Joi.number().integer().required().messages({
        'any.required': 'El ID del post es obligatorio.'
    }),
    userNickname: Joi.string().required().messages({
        'any.required': 'El nickname del usuario es obligatorio.',
    })
});

const actualizarComentarioSchema = Joi.object({
    contenido: Joi.string().min(1).max(500).required()
});

module.exports = {
    crearComentarioConValidacion:validate(crearComentarioSchema),
    actualizarComentarioConValidacion:validate(actualizarComentarioSchema),
};