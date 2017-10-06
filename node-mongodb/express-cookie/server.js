const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const expressJWT = require('express-jwt')
const jwt = require('jsonwebtoken')
const app = express()

app.use(cookieParser('cookie'))

app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))

app.use(expressJWT({secret: 'mytoken'}).unless({path:['/login', '/public']}))

mongoose.connect('mongodb://localhost/test', {
  useMongoClient: true
})
mongoose.Promise = Promise

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: String,
  password: String
})

const User = mongoose.model('users', UserSchema)

app.post('/login', (req, res) => {
  if (!req.body.username) {
    res.sendStatus(400)

    return
  }
  if (!req.body.password) {
    res.sendStatus(400)

    return
  }

  const {username, password} = req.body
  
  User.findOne({username, password}, (err, user) => {
    if (err) throw err
    if (!user) {
      res.sendStatus(400)
      return
    }else{
      var token = jwt.sign({ username: username}, 'mytoken')
      res.json({token})
    }
  })
})

app.get('/protected', (req, res) => {
  res.json({data: 'protected'})
})

app.get('/public', (req, res) => {
  res.json({data: 'public'})
})

app.listen(3001, () => {
  console.log('listening on the 3001 port')
})