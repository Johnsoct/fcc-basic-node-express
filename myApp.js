require('dotenv').config()

const express = require('express')
const app = express()

app.use('/public', express.static(`${__dirname}/public`))

app.get('/', function (req, res) {
  res.sendFile(`${__dirname}/views/index.html`)
})

app.get('/json', function (req, res) {
  let message = 'Hello json'
  let messageStyle = process.env.MESSAGE_STYLE

  if (messageStyle === 'uppercase') {
    message = message.toUpperCase()
  }

  res.json({ message, })
})

module.exports = app
