const { Router } = require('express');
const router = Router();

router.use("/users", require('./user.routes'));
router.use("/comments", require('./comments.routes'));
router.use("/post", require("./post.routes"));
router.use("/tags", require("./tag.routes"));
router.use("/image",require("./postImage.routes"))

module.exports = router;
