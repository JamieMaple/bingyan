const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}))

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
  var category = req.query.category
  var query = category ? { id: category } : {}

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

app.get('/api/goods', (req, res) => {
  var { category, keywords, page=0, perPage=20 } = req.query
  var goodsModel = mongoose.model('goods', goodsSchema)
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
  }

  goodsModel.find(query, (err, docs) => {
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