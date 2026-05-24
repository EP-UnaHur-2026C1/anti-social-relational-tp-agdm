const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const userRouter = require('../routes/user.routes');
app.use(express.json());
app.use('/users', userRouter);

app.get('/', (req, res) => {
  res.send('Welcome to UnaHur - Anti-Social net!');
});

app.listen(port, () => {
  console.log(`UnaHur app listening at http://localhost:${port}`);
});