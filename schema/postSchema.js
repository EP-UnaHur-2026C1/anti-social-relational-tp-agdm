const Joi = require("joi")

const postSchema = Joi.object({
    description: Joi.string()
    .min(1)
    .max(300)
    .messages({
        "string.base": "la descripcion debe ser un texto",
        "string.min": "deben ser minimo 1 caracter",
        "string.max": "deben ser maximo 300 caracteres"
    }),
    tags: Joi.array()
    .items(
        Joi.string()
            .pattern(/^#/)
            .min(2)
            .messages({
                "string.base": "el tag debe ser texto",
                "string.min": "el tag debe tener al menos 1 caracter",
                "string.pattern.base": "el tag debe comenzar con #",
            })
    )
    .messages({
        "array.base": "los tags deben mandarse en un array"
    })
})

module.exports = {postSchema}