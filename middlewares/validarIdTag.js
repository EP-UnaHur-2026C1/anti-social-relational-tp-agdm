const {Tag} = require('../models')

const validarIdTag = async (req, res, next) => {
    try{
        const {id} = req.params;
        const tag = await Tag.findByPk(id)
        if (!tag) {
            return res.status(404).json({ error: 'tag no encontrado.' });
        }
        req.tag = tag
        next()
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener tag.' });
    }
};

module.exports = {
    validarIdTag
}