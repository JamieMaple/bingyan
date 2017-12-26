const { query } = require('./query')
const goods = require('./goods')
const users = require('./users')
const categories = require('./categories')

module.exports = {
  query: query,
  ...goods,
  ...users,
  ...categories,
}
