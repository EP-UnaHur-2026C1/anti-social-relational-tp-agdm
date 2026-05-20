const {Tag} = require('../models')

const validarTagId = async (req, res, next) => {
    try{
        const id = req.params;
        const tag = await Tag.findByPk(id);
        if (!tag){
            res.status(400).json({message: 'no se encontró el Tag'})
        };
        req.tag = tag;
        next();
    }catch (error){
        res.status(500).json({message: error.message[0]});
    };
};

module.exports = {
    validarTagId
}