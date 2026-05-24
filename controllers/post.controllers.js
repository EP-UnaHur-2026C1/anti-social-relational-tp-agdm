const { where } = require('sequelize');
const {Post,Tag} = require('../models');


const crearPost = async (req,res) => {
    try{
        const {description,tags} = req.body
        const post = await Post.create({
            description
        })
        let tag = 0
        tags.forEach(async t => {
            tag = await Tag.findOrCreate({
                where: {nombre: t},
                default:{nombre: t}
            });
            await post.addTag(tag)
        });
        res.status(201).json(post)
    }catch (error){
        res.status(500).json({ message: error.message})
    }
}

const obtenerPost = async (req,res) => {
    const post = req.post
    res.status(200).json(post);
}

const obtenerPosts = async (req,res) => {
    try{
        const post = await Post.findAll({
            attributes: ["description"],
            include:{
                model: Tag,
                as: "tags",
                attributes: ["nombre"]
            }
        });
        res.status(200).json(post);
    }catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {
    crearPost,
    obtenerPost,
    obtenerPosts
}