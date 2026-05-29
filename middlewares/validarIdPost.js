const {Post,User,Tag,Comment,PostImage} = require('../models')

const validarIdPost = async (req, res, next) => {
    try{
        const {id} = req.params;
        const post = await Post.findByPk(id,{
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
        })
         if (!post) {
            return res.status(404).json({ error: 'Post no encontrado.' });
        }
        req.post = post
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener el post.' });
    }
};

module.exports = {
    validarIdPost
}