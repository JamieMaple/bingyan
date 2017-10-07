const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const { Users } = require('../models')

const secretKey = require('./secretkey').secret

const TOKEN_TIME = 60*60*12

router.use(function(req, res, next) {
  next()
})

router.post('/signin', (req, res) => {
  console.log(req.body)
  if(!req.body.username) {
    res.sendStatus(400)
    return
  }

  if(!req.body.password) {
    res.sendStatus(400)
    return
  }

  const { username, password } = req.body

  Users.findOne({username}, (err, user) => {
    if (err) throw error

    if(!user) {
      res.sendStatus(400)
      return
    }

    if (user.comparePassword(password)) {
      const token = jwt.sign({
        uid: user._id
      }, secretKey, {
        expiresIn: TOKEN_TIME
      })
      res.json({token})
    }else {
      res.sendStatus(400)
      return
    }
  })
})
  
router.post('/signup', (req, res) => {
  const {email, username, password1, password2} = req.body

  if (!email || !username || !password1 || !password2) {
    res.sendStatus(400)
    return
  }
  const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    usernameReg = /^[a-zA-Z0-9_-]{5,12}$/,
    passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/

  let noPassNum = 0,
    password = password1

  if (!emailReg.test(email)) {
    noPassNum++
  }

  if (!usernameReg.test(username)) {
    noPassNum++
  }

  if (password1 !== password2) {
    noPassNum++
  }else if(!passwordReg.test(password)){
    noPassNum++
  }

  if (noPassNum > 0) {
    res.send(400)
    return
  }
  console.log(req.body)

  Users.findOne({username}, (err, user) => {
    let done = false
    if (err) throw err
    
    if (user) {
      res.sendStatus(400)

      done = true
    }

    return done
  })
  .then((done) => {
    if (!done) {
      
        let user = new Users({email, username, password, favorite: [], cart: []})
      
        user.save((err) => {
          if (err) throw err

          const token = jwt.sign({
            uid: user._id
          }, secretKey, {
            expiresIn: TOKEN_TIME
          })
          res.send({token})
        })
    }
  }, (err) => {
    throw err
  })
})

module.exports = router