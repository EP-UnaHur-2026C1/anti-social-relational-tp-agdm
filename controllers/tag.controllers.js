const {Tag} = require('../models');

const obtenerTags = async (req,res) => {
    const tag = await Tag.findAll({
        attributes: ["nombre"]
    })
    res.status(200).json(tag)
}


module.exports = {
    obtenerTags
}