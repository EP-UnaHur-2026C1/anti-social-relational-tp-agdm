const express = require("express");
require('dotenv').config();
const app = express();
const port = process.env.PORT;
const db = require('../models')

const swaggerUi = require('swagger-ui-express');
const YAML = require('js-yaml');
const fs = require('fs');

// Swagger UI
const swaggerDoc = YAML.load(fs.readFileSync('./docs/swagger.yaml', 'utf8'));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(express.json()); 

// Rutas 
const routes = require('../routes');

app.use(routes);

app.get("/", (req, res) => {
  res.send("Bienvenido a UnaHur - Anti-Social net!");
});

app.listen(port, async () => {
  await db.sequelize.sync();
  console.log(`UnaHur app escuchando en http://localhost:${port}`);
});

console.log("UnaHur - Anti-Social Net");