const express = require('express')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const router = express.Router()

const { Users, Goods } = require('../models')
const secret = require('./secretkey').secret

const ADD = 1,
  DELETE = 2,
  ALL = 3,
  ADD_TO_CART = 4,
  BUY = 5

router.use(function(req, res, next) {
  const token = req.body.token || req.query.token || req.headers["x-access-token"]
  jwt.verify(token, secret, function(err, decode) {
    if (err) {
      res.sendStatus(400)

      return
    }

    next()
  })
})

router.post('/', (req, res) => {
  res.sendStatus(200)
})

router.post('/info', (req, res) => {
  const uid = jwt.decode(req.body.token).uid

  const id = mongoose.Types.ObjectId(uid)
  
  Users.findOne({_id: id}, (err, user) => {
    const { email, username, sex } = user
    res.json({email, username, sex})
  })
})

router.post('/favorite', (req, res) => {
  const uid = jwt.decode(req.body.token).uid,
    id = mongoose.Types.ObjectId(uid)

  let {type, goodid} = req.body

  type = Number(type)

  switch (type) {
    case ADD:
      Users.update(
        {_id: id},
        {$addToSet: {favorite: goodid}},
        function(err, favorite) {
          res.json(favorite)
        }
      )

      return
    case DELETE:
      Users.update(
        {_id: id},
        {$pull: {favorite: {$in: [goodid]}}},
        function(err, favorite) {
          res.json(favorite)
        }
      )

      return
    case ALL:
      Users.findOne({_id: id}, (err, user) => {
        if(err) throw err
        res.send({favorite: user.favorite})
      })
      return
    default:
      Users.findOne({_id: id}, (err, user) => {
        if(err) throw err

        let query
        if(!user.favorite[0]) {
          query = [{error: -1}]
        }else{
          query = user.favorite.map(item => ({_id: mongoose.Types.ObjectId(item)}))
        }


        Goods.find({$or: query}, (err, goods) => {
          if (err) throw err

          res.json({ favorite: goods })
        })
      })
      return
  }
})

router.post('/cart', (req, res) => {
  const uid = jwt.decode(req.body.token).uid,
  id = mongoose.Types.ObjectId(uid)

  let { type, goodid } = req.body

  type = Number(type)

  switch (type) {
    case ADD_TO_CART:
      Users.update(
        {_id: id},
        {$addToSet: {cart: goodid}},
        function(err, cart) {
          res.json(cart)
        }
      )

      return
    case DELETE:
      Users.update(
        {_id: id},
        {$pull: {cart: {$in: [goodid]}}},
        function(err, cart) {
          res.json(cart)
        }
      )

      return
    default:
      Users.findOne({_id: id}, (err, user) => {
        if(err) throw err


        let query

        if (!user.cart[0]) {
          query = [{error: -1}]
        }else{
          query = user.cart.map(item => ({_id: mongoose.Types.ObjectId(item)}))
        }

        Goods.find({$or: query}, (err, goods) => {
          if (err) throw err

          res.json({ cart: goods })
        })
      })

      return
  }
})

module.exports = router
