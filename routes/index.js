const { Router } = require('express')
const router = Router()

router.use("/users", require('./user.routes'));
router.use("/comments", require('./comments.routes'));
router.use("/post", require("./post.routes"))

module.exports = router