const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const { Goods, Categories } = require('../models')

// 该路由使用的中间件
router.use(function(req, res, next) {
  next()
})

router.get('/categories', (req, res) => {
  var category = req.query.category
  var query = category ? { id: category } : {}

  Categories.find(query, (err, docs) => {
    if (err) throw err;
    
    return [...docs]
  })
  .sort({id: 1})
  .then((docs) => {
    res.send(docs)
  })
  .catch((err) => {
    res.send(err)
  })
})

router.get('/goods', (req, res) => {
  var { category, id, keywords, page=0, perPage=20 } = req.query
  var error = JSON.stringify({ message: 'error', code: '100' })
  var query = {}

  page = Math.max(0, page)
  perPage = Number(perPage)

  if (typeof perPage !== 'number') {
    perPage = 20
  }else{
    perPage = perPage >= 20 ? 20 : perPage
  }
  
  if(category) {
    // find category goods
    category = Math.max(0, category)
    query = {category: category}
  }else if(keywords){
    keywords = keywords.split('+')
    // search for keywords array
    let queryArr = keywords.map(keyword => ({
      $or: [
        {name: new RegExp(keyword, 'g')},
        {description: new RegExp(keyword, 'g')},
      ]
    }))
    
    query = {
      $and: [...queryArr]
    }
  }else if(id) {
    query = {_id: mongoose.Types.ObjectId(id)}
  }

  Goods.find(query, (err, docs) => {
    if (err) throw err

    return [...docs]
  })
  .skip(page*perPage)
  .limit(perPage)
  .then(
    (docs) => {
      res.send(docs)
    }
  )
  .catch(
    (err) => {
      res.send(err)
    }
  )
})

module.exports = router