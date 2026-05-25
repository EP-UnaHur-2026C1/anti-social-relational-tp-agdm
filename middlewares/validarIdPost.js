const {Post,User,Tag} = require('../models')

const validarIdPost = async (req, res, next) => {
    try{
        const {id} = req.params;
        const post = await Post.findByPk(id,{
            attributes: ["id","userNickname","description"],
            include:{
                model: Tag,
                as: "tags",
                attributes: ["nombre"],
                through: {
                    attributes: []
                }
            }
        })
        if (!post){
            return res.status(404).json({message: 'no se encontró el Post'})
        };
        req.post = post;
        next();
    }catch (error){
        res.status(500).json({message: "no se pudo realizar la busqueda del Post"});
    };
};

module.exports = {
    validarIdPost
}