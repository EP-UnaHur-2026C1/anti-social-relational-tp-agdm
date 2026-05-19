const express = require("express");
require('dotenv').config();
const app = express();
const port = process.env.PORT;

app.use(express.json()); 

// Rutas 
const commentRoutes = require('../routes/comments.routes');
app.use('/comments', commentRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenido a UnaHur - Anti-Social net!");
});

app.listen(port, () => {
  console.log(`UnaHur app escuchando en http://localhost:${port}`);
});

console.log("UnaHur - Anti-Social Net");

