require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

const Signal = require('./models/signalModel');

const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello SETI');
});

app.post('/signals', async (req, res) => {
  try {
    const signal = await Signal.create(req.body);
    res.status(200).json(signal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
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
