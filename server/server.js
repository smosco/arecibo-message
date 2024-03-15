require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const signalRoute = require('./routes/signalRoute');

const app = express();

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT;

app.use(express.json());
app.use('/api/signals', signalRoute);

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
