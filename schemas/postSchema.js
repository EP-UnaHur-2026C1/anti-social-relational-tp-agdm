const Joi = require("joi")

const postSchema = Joi.object({
    description: Joi.string()
    .empty()
    .min(1)
    .max(300)
    .messages({
        "string.base": "la descripcion debe ser un texto",
        "string.min": "la descripcion no puede estar vacia",
        "string.max": "deben ser maximo 300 caracteres",
        "string.empty": "la descripcion no puede estar vacia"
    }),
    tags: Joi.array()
    .items(
        Joi.string()
            .empty()
            .pattern(/^#/)
            .min(2)
            .messages({
                "string.base": "el tag debe ser texto",
                "string.min": "el tag debe tener al menos 1 caracter",
                "string.pattern.base": "el tag debe comenzar con #",
                "string.empty": "el tag no puede estar vacio"
            })
    )
    .messages({
        "array.base": "los tags deben mandarse en un array"
    })
})

module.exports = {postSchema}