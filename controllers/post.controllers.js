const { where } = require('sequelize');
const {Post,Tag,User} = require('../models');


const crearPost = async (req,res) => {
    try{
        const {description,tags} = req.body
        const post = await Post.create({description})
        await req.usuario.addPost(post)
        let tag = 0
        for (const t of tags){
            tag = await Tag.findOrCreate({
                where: {nombre: t},
                defaults:{nombre: t}
            });
            await post.addTag(tag[0])
        }
        res.status(201).json(post)
    }catch (error){
        res.status(500).json({ message: "no se pudo crear el post"})
    }
}

const eliminarPost = async (req,res) => {
    try{
        const post = req.post
        await req.usuario.removePost(post)
        await post.removeTags()
        await post.destroy()
        res.status(204)
    }catch (error){
        res.status(500).json({ message: "no se pudo eliminar el post"})
    }
}

const obtenerPost = async (req,res) => {
    const post = req.post
    res.status(200).json(post);
}

const obtenerPosts = async (req,res) => {
    try{
        const posts = await Post.findAll({
            attributes: ["id","userNickname","description"],
            include:{
                model: Tag,
                as: "tags",
                attributes: ["nombre"],
                through: {
                    attributes: []
                }
            }
        });
        res.status(200).json(posts);
    }catch (error) {
        res.status(500).json({
            message: "no se pudo obtener el post"
        })
    }
}

const actualizarPost = async (req,res) => {
    try{
        const post = req.post
        const {description,tags} = req.body
        await post.update({description})
        const arrayTags = []
        for (const t of tags){
            const [tag] = await Tag.findOrCreate({
                where: {nombre: t},
                defaults:{nombre: t}
            });
            arrayTags.push(tag)
        }
        await post.setTags(arrayTags)
        res.status(200).json(post)
    }catch (error){
        res.status(500).json({ message: error.message})
    }
}

module.exports = {
    crearPost,
    obtenerPost,
    obtenerPosts,
    actualizarPost,
    eliminarPost
}