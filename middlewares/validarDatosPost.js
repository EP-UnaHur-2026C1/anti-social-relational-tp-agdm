const {postSchema} = require("../schema/postSchema.js")

const validarDatosPost = (req, res, next) => {
    const {error} = postSchema.validate(req.body)
    if (error){
        res.status(400).json({message: error.details[0].message})
    }
    next()
}

module.exports ={
    validarDatosPost
}