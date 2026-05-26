const express = require("express");
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const db = require('../models')

app.use(express.json()); 

// Rutas 
const postRoutes = require('../routes/post.router');
const commentRoutes = require('../routes/comments.routes');
app.use('/comments', commentRoutes);
app.use('/posts', postRoutes);
app.get("/", (req, res) => {
  res.send("Bienvenido a UnaHur - Anti-Social net!");
});

app.listen(port, async () => {
  await db.sequelize.sync();
  console.log(`UnaHur app escuchando en http://localhost:${port}`);
});

console.log("UnaHur - Anti-Social Net");

