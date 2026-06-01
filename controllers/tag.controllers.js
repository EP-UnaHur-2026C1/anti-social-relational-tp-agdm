const {Tag,Post} = require('../models');

const obtenerTags = async (req,res) => {
    try{
        const tag = await Tag.findAll({
        attributes: ["nombre"]
        })
        res.status(200).json(tag)
    }catch (error){
        res.status(500).json({ error: 'Error al obtener el tags.' })
    }
}

const obtenerTagsDePost = async (req,res) => {
    try{
        const post = req.post;
        const tags = await post.getTags()
        const soloTags = tags.map(t => t.nombre);
        res.status(200).json(soloTags);
    }catch (error){
        res.status(500).json({ error: 'Error al obtener el tags.' })
    }
}

const eliminarTag = async (req,res) => {
    try{
        const tag = req.tag;
        await tag.destroy();
        res.status(200).json({message: "se elimino el tag"});
    }catch (error){
        res.status(500).json({ error: 'Error al eliminar tag.' })
    }
}

module.exports = {
    obtenerTags,
    obtenerTagsDePost,
    eliminarTag
}