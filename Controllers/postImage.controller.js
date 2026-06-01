const {Post,PostImage} = require('../models');

const obtenerTodasLasImagenes = async (req,res) =>{
    try{
        const imagenes = await PostImage.findAll({
            attributes: ["id","url","postId"],
        })
        res.status(200).json(imagenes)
    }catch (error){
        res.status(500).json({message: "no se pudo realizar la busqueda de imagenes"})
    }
}

const obtenerImagenesDelPost = async (req,res) => {
    try{
        const {id} = req.params;
        const imagenes = await PostImage.findAll({
            where: {postId: id},
            attributes: ["id","url"],
        });
        res.status(200).json(imagenes);
    }catch (error){
        res.status(500).json({message: "no se pudo realizar la busqueda de imagenes por Post"})
    }
}

const eliminarImagen = async (req,res) =>{
    try{
        const image = req.image
        await image.destroy()
        res.status(200).json({message: "se eliminó con exito"})
    }catch (error){
        res.status(500).json({error: error.message})
    }
}

module.exports = {
    obtenerTodasLasImagenes,
    obtenerImagenesDelPost,
    eliminarImagen
}