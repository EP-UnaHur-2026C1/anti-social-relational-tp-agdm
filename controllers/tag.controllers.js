const {Tag} = require('../models');

const obtenerTag = async (req,res) => {
    const tag = req.tag;
    res.status(200).json(tag)
}

const crearTag = async (req,res) => {
    try{
        const {nombre} = req.body
        const tag = await Tag.create({
            nombre: nombre
        })
        res.status(201).json(tag)
    }catch (error){
        res.status(500).json({ message: error.message})
    }
}


module.exports = {
    obtenerTag,
    crearTag
}