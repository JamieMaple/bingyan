const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

// models
const { Categories, Goods, Users } = require('./models')

// routes
const api = require('./routes/api')
const user = require('./routes/user')
const auth = require('./routes/userAction')

app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))

app.use('/api', api)

app.use('/user', user)

app.use('/auth', auth)

app.use(express.static(path.join(__dirname, 'www')))

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'www'))
})

const APP_PORT = 3000

app.listen(APP_PORT, () => {
  console.log(`listening on the port ${APP_PORT}.`)
})
