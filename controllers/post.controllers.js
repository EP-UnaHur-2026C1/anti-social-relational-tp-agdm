const { where } = require('sequelize');
const {Post,Tag,User,PostImage,Comment} = require('../models');


const crearPost = async (req,res) => {
    try{
        const {description,tags,images} = req.body
        const post = await Post.create({description})
        await req.usuario.addPost(post)

        for (const t of tags){
            const [tag] = await Tag.findOrCreate({
                where: {nombre: t},
                defaults:{nombre: t}
            });
            await post.addTag(tag)
        }

        let img = ""
        for (const u of images){
            img = await PostImage.create({url:u})
            await post.addImage(img)
        }
        res.status(201).json(post)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear el post.' });
  }
}


const obtenerPosts = async (req,res) => {
    try{
        const posts = await Post.findAll({
            attributes: ["id","description"],
            include:[
                {
                    model: User,
                    as: 'author',
                    attributes: ['nickName']
                },
                {
                    model: Comment,
                    as: 'comments',
                    attributes: ['contenido', 'userNickname', 'createdAt']
                },
                {
                    model: PostImage,
                    as: 'images',
                    attributes: ['url']
                },
                {
                    model: Tag,
                    as: "tags",
                    attributes: ["nombre"],
                    through: {
                        attributes: []
                }
            }]
        });
        res.status(200).json(posts);
    }catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los posts.' });
    }
}

const obtenerPostPorUsuario = async (req, res) => {
  try {
    const { nickName } = req.params;

    const posts = await Post.findAll({
      where: {
        userNickname : nickName
      },
      attributes: ['id', 'description', 'createdAt', 'updatedAt'],
      include: [
        {
          model: PostImage,
          as: 'images',
          attributes: ['url']
        },
        {
            model: Tag,
            as: "tags",
            attributes: ["nombre"],
            through: {
                attributes: []
            }
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener los posts del usuario.' });
  }
};

const obtenerPostPorId = async (req,res) => {
    const post = req.post
    res.status(200).json(post);
}


const actualizarPost = async (req,res) => {
    try{
        const post = req.post
        const {description,tags,images} = req.body
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
        
        for (image of (await post.getImages())){
            await image.destroy()
        }
        let img = ""
        for (const u of images){
            img = await PostImage.create({url:u})
            await post.addImage(img)
        }
        res.status(200).json(post)
    }catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al actualizar el post.' });
  }
}

const eliminarPost = async (req,res) => {
    try{
        const post = req.post
        for (image of (await post.getImages())){
            await image.destroy()
        }
        await post.destroy()
        res.status(200).json({ message: 'Post eliminado correctamente.' });
    }catch (error){
        console.log(error);
        res.status(500).json({ error: 'Error al eliminar el post.' });
    }
}

module.exports = {
    crearPost,
    obtenerPostPorId,
    obtenerPosts,
    actualizarPost,
    eliminarPost,
    obtenerPostPorUsuario
}