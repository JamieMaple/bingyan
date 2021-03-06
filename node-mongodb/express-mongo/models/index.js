const mongoose = require('mongoose')
const crypto = require('crypto')

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

const userSchema = new Schema({
  email: String,
  username: String,
  password: String,
  sex: Number,
  favorite: Array,
  cart: Array
})

userSchema.methods.comparePassword = function(reqPassword) {
  reqPassword = crypto
    .createHmac('sha256', reqPassword)
    .update('utf8')
    .digest('base64')

  return reqPassword === this.password
}

const models = {
  Categories: mongoose.model('categories', categoriesSchema),
  Goods: mongoose.model('goods', goodsSchema),
  Users: mongoose.model('users', userSchema)
}

module.exports = models