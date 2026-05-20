const Joi = require("joi")

const tagSchema = Joi.object({
    nombre: Joi.string()
    .pattern(/^#/)
    .min(2)
    .required()
    .messages({
        "string.base": "el tag debe ser texto",
        "string.empty": "el tag debe ser obligatorio",
        "string.min": "el tag debe tener al menos 1 caracter",
        "string.pattern.base": "el tag debe comenzar con #",
        "any.required": "el tag es obligatorio"
    })
})

module.exports = {
    tagSchema
}