const { Comment, User, Post } = require('../models');
const { Op } = require('sequelize');

const obtenerComentarios = async (req, res) => {
    try {
        const { postId } = req.params;

        const mesesVisibilidad = process.env.MESES_VISIBILIDAD || 6;
        
        const fechaLimite = new Date();
        fechaLimite.setMonth(fechaLimite.getMonth() - mesesVisibilidad);

        const comentarios = await Comment.findAll({
            where: {
                postId,
                visible: true,
                createdAt: {
                    [Op.gte]: fechaLimite
                },
            },
            attributes: ['id', 'contenido', 'createdAt'],
            include: [
                {
                    model: User,
                    as: "author",
                    attributes: ['nickname'],
                },
            ],
        });

        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los comentarios.' });
    }
};

const crearComentario = async (req, res) => {
    try {
        const { contenido, postId, userNickname } = req.body;

        const post = await Post.findByPk(postId);
        if (!post) return res.status(404).json({ error: 'El post no existe.' });

        const user = await User.findOne({ where: { nickname: userNickname } });
        if (!user) return res.status(404).json({ error: 'El usuario no existe.' });

        const nuevoComentario = await Comment.create({
            contenido,
            postId,
            userNickname,
            visible: true,
        });

        res.status(201).json(nuevoComentario);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear el comentario.' });
    }
};

const actualizarComentario = async (req, res) => {
    try {
        const { id } = req.params;

        const comentario = await Comment.findByPk(id);
        if (!comentario) {
            return res.status(404).json({ error: 'Comentario no encontrado.' });
        }

        const { contenido } = req.body;
        await comentario.update({ contenido });

        res.status(200).json(comentario);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el comentario.' });
    }
};

const eliminarComentario = async (req, res) => {
    try {
        const { id } = req.params;

        const comentario = await Comment.findByPk(id);
        if (!comentario) {
            return res.status(404).json({ error: 'Comentario no encontrado.' });
        }

        await comentario.destroy();

        res.status(200).json({ message: 'Comentario eliminado correctamente.' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el comentario.' });
    }
};


module.exports = {
    obtenerComentarios,
    crearComentario,
    actualizarComentario,
    eliminarComentario
};