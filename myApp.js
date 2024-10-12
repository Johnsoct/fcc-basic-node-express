const express = require('express');
const app = express();

app.use('/public', express.static(`${__dirname}/public`))

app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/views/index.html`)
})

app.get('/json', function (req, res) {
  res.json({ message: 'Hello json' })
})

module.exports = app;
