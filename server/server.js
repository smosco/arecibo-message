const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello SETI');
});

app.listen(8080, () => {
  console.log('seti server is running on port 8080');
});
