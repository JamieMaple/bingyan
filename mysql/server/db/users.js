const tableNames = require('./tableNames')
const { Select, Insert, Delete } = require('./SQL')
const pool = require('./connection')
const crypto = require('crypto')

const secretOrPrivateKey = 'secretToken'

const TOKEN_TIME = 60 * 60 * 2

function cryptoPassword(reqPassword) {
  return crypto
    .createHmac('sha256', reqPassword)
    .update('utf8')
    .digest('base64')
}

function _comparePassword(reqPassword, password) {
  reqPassword = cryptoPassword(reqPassword)

  return reqPassword === password
}

function _findUsers(username, email = '', userid = '') {
  const _ = /#/g
  const escapedUsername = pool.escape(username)
  const escapedEmail = pool.escape(email)
  const sql = new Select(tableNames.users)
  let whereCondition = `username=${escapedUsername} ${email ? `or email=${escapedEmail}` : ''}`.trim()

  return '' + sql.where(whereCondition)
}

function _findUserById(id) {
  const escapedUserId = pool.escape(id)
  const sql = new Select(tableNames.users)
  let whereCondition = `id=${id}`

  return '' + sql.where(whereCondition)
}

function _insertUser(username, email, password, sex=-1) {
  const sql = new Insert(tableNames.users, {username, email, password: cryptoPassword(password), sex})
  return '' + sql
}

function _insertCart(userid, goodid, num = 1) {
  const sql = new Insert(tableNames.cart, {userid, goodid, num})
  return '' + sql
}

function _insertFavorite(userid, goodid) {
  const sql = new Insert(tableNames.favorite, {userid, goodid})
  return '' + sql
}

const _deleteItem = table => (userid, goodid) => {
  const whereCondition = `userid=${userid} and goodid=${goodid}`
  const sql = new Delete(table, whereCondition)

  return '' + sql
}

const _findItems = table => userid => {
  const sql = new Select(table)

  return '' + sql.where(`userid=${userid}`)
}

module.exports = {
  secret: secretOrPrivateKey,
  time: TOKEN_TIME,
  findUsers: _findUsers,
  findUserById: _findUserById,
  findFavorite: _findItems(tableNames.favorite),
  findCart: _findItems(tableNames.cart),
  insertUser: _insertUser,
  insertCart: _insertCart,
  insertFavorite: _insertFavorite,
  deleteCart: _deleteItem(tableNames.cart),
  deleteFavorite: _deleteItem(tableNames.favorite),
  comparePassword: _comparePassword,
}
