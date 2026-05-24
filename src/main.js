const express = require("express");
const app = express();
const db = require("../models");
const port = 3000;
const routerTag = require("../routes/tag.routes.js");
const routerPost = require("../routes/post.routes.js");

app.use(express.json());

app.use("/tag", routerTag);
app.use("/post", routerPost);

app.get("/", (req, res) => {
  res.send("Welcome to UnaHur - Anti-Social net!");
});

app.listen(port, async () => {
  await db.sequelize.sync();
  console.log(`UnaHur app listening at http://localhost:${port}`);
});

console.log("UnaHur - Anti-Social net");
