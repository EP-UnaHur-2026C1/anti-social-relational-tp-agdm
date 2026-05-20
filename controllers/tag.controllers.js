const {Tag} = require('../models');

const obtenerTag = async (req,res) => {
    const tag = req.tag;
    res.status(200).json(tag)
}


module.exports = {
    obtenerTag
}