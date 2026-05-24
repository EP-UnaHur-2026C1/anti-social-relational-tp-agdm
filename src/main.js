HEAD
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require('../routes/user.routes');
app.use('/users', userRouter);

const express = require("express");
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const db = require('../models')

app.use(express.json()); 

// Rutas 
const commentRoutes = require('../routes/comments.routes');
app.use('/comments', commentRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenido a UnaHur - Anti-Social net!");
});

app.listen(port, async () => {
  await db.sequelize.sync();
  console.log(`UnaHur app escuchando en http://localhost:${port}`);
});

console.log("UnaHur - Anti-Social Net");

>>>>>>> bd26a07cfe0370a7d004492dbddf8e089cb40a7c
