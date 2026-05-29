const Joi = require("joi")

const postSchema = Joi.object({
    description: Joi.string()
    .trim()
    .min(1)
    .max(1000)
    .required()
    .messages({
        "string.base": "la descripcion debe ser un texto",
        "string.min": "la descripcion no puede estar vacia",
        "string.max": "deben ser maximo 1000 caracteres",
        'any.required': 'La descripción es obligatoria'
    }),
    tags: Joi.array()
    .items(
        Joi.string()
            .trim()
            .empty()
            .pattern(/^#\S+$/)
            .min(2)
            .messages({
                "string.base": "el tag debe ser texto",
                "string.min": "el tag debe tener al menos 1 caracter",
                "string.pattern.base": "el tag debe comenzar con # y no puede haber espacio entre palabras",
                "string.empty": "el tag no puede estar vacio"
            })
    )
    .required()
    .messages({
        "array.base": "los tags deben mandarse en un array",
        'any.required': 'la seccion de tags debe estar'
    }),
    images: Joi.array()
    .items(
        Joi.string()
            .uri()
            .empty()
            .pattern(/^\S+$/)
            .messages({
                "string.base": "el tag debe ser texto",
                "string.uri": "debe ser una URL valida",
                "string.empty": "debe agregar una URL",
                "string.pattern.base": "la URL de la imagen no puede tener espacios"
            })
    )
    .required()
    .messages({
        "array.base": "las imagenes deben mandarse en un array",
        'any.required': 'la seccion de images debe estar'
    })
})

module.exports = {postSchema}