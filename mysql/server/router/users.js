const Router = require('koa-router')
const BodyParser = require('koa-bodyparser')
const jwt = require('jsonwebtoken')
const { query, insertUser, findUsers, comparePassword, secret, time } = require('../db')

const router = new Router

router.use(BodyParser())

function generateToken(id) {
  return jwt.sign({
    uid: id
  }, secret, {
    expiresIn: time,
  })
}

router.post('/signin', async (ctx) => {
  const { username, password } = ctx.request.body
  if (!username || !password) {
    ctx.status = 400
    return
  }

  const [ user ] = await query(findUsers(username))

  if (comparePassword(password, user.password)) {
    const token = generateToken(user.id)
    ctx.body = JSON.stringify({token: token})
  } else {
    ctx.status = 400
  }
})

router.post('/signup', async (ctx) => {
  const { email, username, password } = ctx.request.body

  if (!email || !username || !password) {
    ctx.status = 400
    return
  }

  const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    usernameReg = /^[a-zA-Z0-9_-]{5,12}$/,
    passwordReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/

  let noPassNum = 0

  if (!emailReg.test(email)) {
    noPassNum++
  }

  if (!usernameReg.test(username)) {
    noPassNum++
  }

  if (!passwordReg.test(password)) {
    noPassNum++
  }

  if (noPassNum > 0) {
    ctx.status = 400
    return
  }

  const [user] = await query(findUsers(username))

  if (!user) {
    const user = await query(insertUser(username, email, password))
    const token = generateToken(user.id)
    ctx.body = JSON.stringify({token: token})
  } else {
    ctx.status = 400
    return
  }
})

module.exports = router