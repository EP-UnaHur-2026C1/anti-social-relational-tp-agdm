const { Association } = require('sequelize');
const {User}= require('../models');

const obtenerUsuarios = async (req,res)=>{
    try {
    const usuarios = await User.findAll({
        attributes: ['nickName','email']
    });
    res.status(200).json(usuarios);
    } catch(error){
        res.status(500).json({error: 'Error al obtener los usuarios'});
    }

};

const obtenerUsuario = async (req, res) => {
  try {
    const usuarioCompleto = await User.findByPk(req.usuario.nickName, {
      attributes: ['nickName', 'email'],
      include: [
        { association: 'Followers', attributes: ['nickName'],
          through: { attributes: [] }
         },
        { association: 'Following', attributes: ['nickName'],
          through: { attributes: [] }
         },
      ],
    });

    res.status(200).json(usuarioCompleto);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el usuario' });
  }
};

const crearUsuario = async(req,res,next)=>{
    try {
        const {nickName,email,password} = req.body;
        const nuevoUsuario = await User.create({nickName,email,password});
        res.status(201).json(nuevoUsuario);
    } catch(error){
        res.status(500).json({error: 'Error al crear el usuario'});
    }
};

const actualizarUsuario = async (req, res) => {
  try {
    await req.usuario.update(req.body);
    res.status(200).json({ nickName: req.usuario.nickName, email: req.usuario.email });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
};

const eliminarUsuario = async(req,res)=>{
    try{
        const {nickName} = req.params;
        await req.usuario.destroy();
        res.status(200).json({message: `Usuario ${nickName} eliminado correctamente`});
    } catch(error){
        res.status(500).json({error: `Error al eliminar el usuario ${nickName}`});
    }
};

const seguirUsuario = async (req, res) => {
  try {
    const { seguidor, seguido } = req.body;

    if (seguidor === seguido)
      return res.status(400).json({ error: 'No podés seguirte a vos mismo' });

    const yaLoSigue = await req.usuarioSeguidor.hasFollowing(req.usuarioSeguido);
    if (yaLoSigue)
      return res.status(409).json({ error: 'Ya seguís a este usuario' });

    await req.usuarioSeguidor.addFollowing(req.usuarioSeguido);
    
    res.status(200).json({ message: `${seguidor} está siguiendo ahora a ${seguido}` });
  } catch (error) {
    res.status(500).json({ error:`No se ha podido seguir a ${seguido}`});
  }
};

const dejarDeSeguir = async (req, res) => {
  try {
    const { seguidor, seguido } = req.body;
    
    const loSigue = await req.usuarioSeguidor.hasFollowing(req.usuarioSeguido);
    if (!loSigue)
      return res.status(400).json({ error: 'No seguís a este usuario' });

    await req.usuarioSeguidor.removeFollowing(req.usuarioSeguido);
    res.status(200).json({ message: `${seguidor} dejó de seguir a ${seguido}` });
  } catch (error) {
    res.status(500).json({ error: 'Error al dejar de seguir al usuario' });
  }
};

module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario,
    seguirUsuario,
    dejarDeSeguir
}