const { Post, Comment } = require('../models');

const validarPostConComentarios = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cantidadComentarios = await Comment.count({
            where: { postId: id }
        });

        if (cantidadComentarios === 0) {
            return res.status(400).json({ error: 'El post no tiene comentarios.' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Error al validar el post.' });
    }
};
        
module.exports = {
    validarPostConComentarios
}