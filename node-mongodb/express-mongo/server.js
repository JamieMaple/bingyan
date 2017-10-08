const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
<<<<<<< HEAD
=======

const cookeParser = require('cookie-parser')
>>>>>>> 55eef819992c632ae0b6254ae29d3d263d1d9386
const jwt = require('jsonwebtoken')

// models
const { Categories, Goods, Users } = require('./models')

// routes
const api = require('./routes/api')
const user = require('./routes/user')
const auth = require('./routes/userAction')

const app = express()

app.use(cors())

app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))

app.use('/api', api)

app.use('/', user)

app.use('/auth', auth)

app.post('/api/login', (req, res) => {
  if(!req.body.username) {
    res.sendStatus(400)
    return
  }

  if(!req.body.password) {
    res.sendStatus(400)
    return
  }

  res.json({data: 'protectced'})
})

const APP_PORT = 3001

app.listen(APP_PORT, () => {
  console.log(`listening on the port ${APP_PORT}.`)
})
