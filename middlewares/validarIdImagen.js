const {PostImage} = require('../models')

const validarIdImagen = async ( req, res, next) => {
    try{
        const {id} = req.params;
        const image = await PostImage.findByPk(id)
        if (!image) {
            return res.status(404).json({ error: 'La imagen no existe' });
        }
        req.image = image
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener imagen.' });
    }
}

module.exports = {validarIdImagen}