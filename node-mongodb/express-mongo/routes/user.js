const express = require('express')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const router = express.Router()

const { Users } = require('../models')

const secretKey = require('./secretkey').secret

const TOKEN_TIME = 60 * 60 * 2

router.post('/signin', (req, res) => {
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
    }
  })
})

router.post('/signup', (req, res) => {
  const { email, username, password } = req.body

  if (!email || !username || !password) {
    res.sendStatus(400)
    
    return
  }
  const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    usernameReg = /^[a-zA-Z0-9_-]{5,12}$/,
    passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/

  let noPassNum = 0

  if (!emailReg.test(email)) {
    noPassNum++
  }

  if (!usernameReg.test(username)) {
    noPassNum++
  }

  if (!passwordReg.test(password)) {
    noPassNum++
  }

  if (noPassNum > 0) {
    res.send(400)
    return
  }

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
      encode_password = crypto
        .createHmac('sha256', password)
        .update('utf8')
        .digest('base64')

        let user = new Users({
          email,
          username,
          password: encode_password, 
          sex: -1,
          favorite: [], 
          cart: []
        })

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
