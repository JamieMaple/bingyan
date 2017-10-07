const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const router = express.Router()

const { Users, Goods } = require('../models')
const secret = require('./secretkey').secret

router.use(function(req, res, next) {
  next()
})

router.post('/info', (req, res) => {
  var token = req.body.token || req.query.token || req.headers["x-access-token"]
  jwt.verify(token, secret, function(err, decode) {
    if (err){
      res.json({err})
    }else{
      const uid = mongoose.Types.ObjectId(decode.uid)
      Users.findOne({_id: uid}, (err, user) => {
        const {email, username} = user

        res.json({email, username})
      })
    }
  })
})

// get favorite
router.post('/favorite', (req, res) => {
  var token = req.body.token || req.query.token || req.headers["x-access-token"]
  jwt.verify(token, secret, function(err, decode) {
    if (err){
      res.json({err})
    }else{
      const uid = mongoose.Types.ObjectId(decode.uid)

      Users.findOne({_id: uid}, (err, user) => {
        if(err) throw err

        const favorite = user.favorite || [],
        query = favorite.map(item => ({_id: mongoose.Types.ObjectId(item)}))

        Goods.find({$or: query}, (err, goods) => {
          if (err) throw err

          res.json({favorite: goods})
        })
      })
    }
  })
})

// add or delete favorite
// type : delete, add
// good_id : 

router.post('/favorite/actions', (req, res) => {
  var token = req.body.token || req.query.token || req.headers["x-access-token"]
  jwt.verify(token, secret, function(err, decode) {
    if (err){
      res.json({err})
    }else{
      const uid = mongoose.Types.ObjectId(decode.uid)

      Users.findOne({_id: uid}, (err, user) => {
        if(err) throw err
        
        
      })
    }
  })
})

router.post('/cart', (req, res) => {
  var token = req.body.token || req.query.token || req.headers["x-access-token"]
  jwt.verify(token, secret, function(err, decode) {
    if (err){
      res.json({err})
    }else{
      const uid = mongoose.Types.ObjectId(decode.uid)
      
      Users.findOne({_id: uid}, (err, user) => {
        if(err) throw err

        res.json({ cart: user.cart })
      })
    }
  })
})

module.exports = router