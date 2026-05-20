const express = require("express");
const app = express();
const port = 3000;
const routerTag = require("../routes/tag.routes.js");

app.use(express.json());

app.use("/tag", routerTag);

app.get("/", (req, res) => {
  res.send("Welcome to UnaHur - Anti-Social net!");
});

app.listen(port, () => {
  console.log(`UnaHur app listening at http://localhost:${port}`);
});

console.log("UnaHur - Anti-Social net");
