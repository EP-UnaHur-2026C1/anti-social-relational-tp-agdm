const {Post} = require('../models')

const validarIdPost = async (req, res, next) => {
    try{
        const id = req.params;
        const post = await Post.findByPk(id,{
            attributes: ["description"],
            include:{
                model: Tag,
                as: "tags",
                attributes: ["nombre"]
            }
        });
        if (!post){
            res.status(400).json({message: 'no se encontró el Post'})
        };
        req.post = post;
        next();
    }catch (error){
        res.status(500).json({message: error.message});
    };
};

module.exports = {
    validarIdPost
}