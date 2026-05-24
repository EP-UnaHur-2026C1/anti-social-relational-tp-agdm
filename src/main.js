const express = require("express");
const app = express();
const port = process.env.PORT;
const db = require('../models')
require('dotenv').config();
app.use(express.json()); 

// Rutas 
const routes = require('../routes');
app.use('/comments', commentRoutes);
app.use('/users', userRouter);

app.get("/", (req, res) => {
  res.send("Bienvenido a UnaHur - Anti-Social net!");
});

app.listen(port, async () => {
  await db.sequelize.sync();
  console.log(`UnaHur app escuchando en http://localhost:${port}`);
});

console.log("UnaHur - Anti-Social Net");

