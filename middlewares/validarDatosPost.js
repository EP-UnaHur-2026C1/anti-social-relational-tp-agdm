const {postSchema} = require("../schemas/postSchema.js")

const validarDatosPost = (req, res, next) => {
    const {error} = postSchema.validate(req.body)
    if (error){
        return res.status(400).json({message: error.details[0].message})
    }
    next()
}

module.exports ={
    validarDatosPost
}