// Packages
require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')

const app = express()

app.use('/public', express.static(`${__dirname}/public`))

app.use(function (req, res, next) {
  console.log(req.ip)
  const method = req.method
  const path = req.url
  const ip = req.ip
  
  console.log(`${method} ${path} - ${ip}`)

  next()
})

app.use(bodyParser.urlencoded({ extended: false }))

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

app.get(
  '/now', 
  function (req, res, next) {
    req.time = new Date().toString()
    next()
  },
  function (req, res) {
    res.send({ time: req.time })
  }
)

app.get('/:word/echo', function (req, res) {
  res.send({ echo: req.params.word })
})

app.get('/name', function (req, res) {
  const first = req.query.first
  const last = req.query.last
  
  res.json({ name: `${first} ${last}` })
})

app.post('/name', function (req, res) {
  res.json({ name: `${req.body.first} ${req.body.last}` })
})

module.exports = app
