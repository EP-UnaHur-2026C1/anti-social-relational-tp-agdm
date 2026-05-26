const { User, Post, Comment, Tag, PostImage } = require('../models');

const obtenerPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ['id', 'description', 'userNickname', 'createdAt', 'updatedAt'],
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['nickName', 'email']
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['id', 'contenido', 'visible', 'userNickname', 'postId', 'createdAt']
        },
        {
          model: PostImage,
          as: 'images',
          attributes: ['id', 'url', 'postId']
        },
        {
          model: Tag
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener los posts.' });
  }
};

const obtenerPostPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id, {
      attributes: ['id', 'description', 'userNickname', 'createdAt', 'updatedAt'],
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['nickName', 'email']
        },
        {
          model: Comment,
          as: 'comments',
          attributes: ['id', 'contenido', 'visible', 'userNickname', 'postId', 'createdAt']
        },
        {
          model: PostImage,
          as: 'images',
          attributes: ['id', 'url', 'postId']
        },
        {
          model: Tag
        }
      ]
    });

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado.' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al obtener el post.' });
  }
};

const obtenerPostPorUsuario = async (req, res) => {
  try {
    const { userNickname } = req.params;

    const posts = await Post.findAll({
      where: {
        userNickname
      },
      attributes: ['id', 'description', 'userNickname', 'createdAt', 'updatedAt'],
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['nickName', 'email']
        },
        {
          model: PostImage,
          as: 'images',
          attributes: ['id', 'url', 'postId']
        },
        {
          model: Tag
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

const crearPost = async (req, res) => {
  try {
    const { description, userNickname } = req.body;

    const user = await User.findByPk(userNickname);

    if (!user) {
      return res.status(404).json({ error: 'El usuario no existe.' });
    }

    const nuevoPost = await Post.create({
      description,
      userNickname
    });

    res.status(201).json(nuevoPost);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al crear el post.' });
  }
};

const actualizarPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado.' });
    }

    await post.update({
      description
    });

    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al actualizar el post.' });
  }
};

const eliminarPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findByPk(id);

    if (!post) {
      return res.status(404).json({ error: 'Post no encontrado.' });
    }

    await post.destroy();

    res.status(200).json({ message: 'Post eliminado correctamente.' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al eliminar el post.' });
  }
};

module.exports = {
  obtenerPosts,
  obtenerPostPorId,
  obtenerPostPorUsuario,
  crearPost,
  actualizarPost,
  eliminarPost
};