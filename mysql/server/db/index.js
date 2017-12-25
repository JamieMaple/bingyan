const { query } = require('./query')
const goods = require('./goods')
const users = require('./users')
const categories = require('./categories')

module.exports = {
  query: query,
  searchGood: goods.searchGood,
  searchGoods: goods.searchGoods,
  searchCategory: goods.searchCategory,
  searchCategories: categories.searchCategories,
  findUsers: users.findUsers,
  findUserById: users.findUserById,
  insertUser: users.insertUser,
  comparePassword: users.comparePassword,
  secret: users.secret,
  time: users.time,
}
