require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const signalRoute = require('./routes/signalRoute');
const errorMiddleware = require('./middleware/errorMiddleware');
const cors = require('cors');

const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;
const FRONTEND = process.env.FRONTEND;

const corsOptions = {
  origin: FRONTEND,
  optionsSuccessStatus: 200,
};

// 미들웨어의 순서가 중요
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/signals', signalRoute);
app.use(errorMiddleware);

app.get('/', (req, res) => {
  res.send('Hello SETI');
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log('seti server is running on port 8080');
    });
    console.log('connected mongodb');
  })
  .catch((error) => {
    console.log(error);
  });
