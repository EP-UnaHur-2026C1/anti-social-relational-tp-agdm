const {tagSchema} = require("../schema/tagSchema.js")

const validarDatosDelTag = (req, res, next) => {
    const {error} = tagSchema.validate(req.body)
    if (error){
        res.status(400).json({message: error.details[0].message})
    }
    next()
}

module.exports ={
    validarDatosDelTag
}