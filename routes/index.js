const {Router}= require('express')
const router=Router()
router.use(require('./user.routes'));
router.use(require('./comments.routes'));

module.exports= router