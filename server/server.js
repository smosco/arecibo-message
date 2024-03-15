require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const MONGO_URL = process.env.MONGO_URL;

app.get('/', (req, res) => {
  res.send('Hello SETI');
});

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(8080, () => {
      console.log('seti server is running on port 8080');
    });
    console.log('connected mongodb');
  })
  .catch((error) => {
    console.log(error);
  });
