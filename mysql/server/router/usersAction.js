const Router = require('koa-router')
const router = new Router
const jwt = require('jsonwebtoken')
const BodyParser = require('koa-bodyparser')
const { query, secret, findUserById } = require('../db')

const ADD = 1,
  DELETE = 2,
  ALL = 3,
  ADD_TO_CART = 4,
  BUY = 5


router.use(BodyParser())

router.use(async (ctx, next) => {
  const token = ctx.request.body.token
  if (token) {
    jwt.verify(token, secret, function(err, decode) {
      if (err) {
        throw err
        ctx.status = 400
        return
      }
    })
    await next()
  } else {
    ctx.status = 400
  }
})

router.post('/', async (ctx) => {
  ctx.status = 200
})

router.post('/info', async (ctx) => {
  const { uid } = jwt.decode(ctx.request.body.token)

  const [user] = await query(findUserById(uid))

  ctx.body = JSON.stringify({username: user.username, email: user.email, sex: user.sex})
})

router.post('/favorite', async (ctx) => {
  const { uid } = jwt.decode(req.body.token)
  let { type, goodid } = ctx.request.body

  // switch (type) {
  //   case ADD:
      
  //     break;
  
  //   default:
  //     break;
  // }
})

router.post('/cart', async (ctx) => {
  ctx.body = 'cart'
})

module.exports = router
