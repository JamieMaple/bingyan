const tableNames = require('./tableNames')
const { Select, Insert } = require('./SQL')
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

module.exports = {
  secret: secretOrPrivateKey,
  time: TOKEN_TIME,
  findUsers: _findUsers,
  findUserById: _findUserById,
  insertUser: _insertUser,
  comparePassword: _comparePassword,
}
