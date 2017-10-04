const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

app.use(cors())

mongoose.connect('mongodb://localhost/Shop', {
  useMongoClient: true
})

mongoose.Promise = Promise

const Schema = mongoose.Schema

const categoriesSchema = new Schema({
  name: String,
  id: Number
})

const goodsSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  img: String,
  category: Number
})

app.get('/api/categories', (req, res) => {
  var categoriesModel = mongoose.model('categories', categoriesSchema)
  var id = req.query.id
  var query = id ? { id } : {}

  categoriesModel.find(query, (err, docs) => {
    if (err) {
      res.send(JSON.stringify({message: 'error', code: '100'}))
    }
    
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

app.get('/api/category', (req, res) => {
  var { id=0, page=0,perPage=20 } = req.query
  var goodsModel = mongoose.model('goods', goodsSchema)
  var error = JSON.stringify({ message: 'error', code: '100' })
  var perPage = perPage >= 20? 20 : perPage

  id = Math.max(0, id)
  page = Math.max(0, page)

  goodsModel.find({category: id}, (err, docs) => {
    if (err) {
      res.send(error)
    }

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

const APP_PORT = 3001

app.listen(APP_PORT, () => {
  console.log(`listening on the port ${APP_PORT}.`)
})