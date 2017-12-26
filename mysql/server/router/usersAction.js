const Router = require('koa-router')
const router = new Router
const jwt = require('jsonwebtoken')
const BodyParser = require('koa-bodyparser')
const { 
  query,
  secret,
  findUserById,
  findFavorite,
  findCart,
  insertFavorite,
  insertCart,
  deleteFavorite,
  deleteCart
} = require('../db')

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
  const { uid } = jwt.decode(ctx.request.body.token)
  let { type, goodid } = ctx.request.body

  type = Number(type)
  goodid = Number(goodid)

  if (type === ADD || type === DELETE) {
    if (!goodid) {
      ctx.status = 400
      return
    }
  }

  switch (type) {
    case ADD:
      const favorite = await query(findFavorite(uid))
      let readyHave = false

      favorite.forEach(good => {
        if (goodid === good.goodid) {
          readyHave = true
        }
      })

      if (!readyHave) {
        const add = await query(insertFavorite(uid, goodid))
        ctx.body = JSON.stringify(add)
      } else {
        ctx.status = 200
      }
      break
    case DELETE:
      const del = await query(deleteFavorite(uid, goodid))
      ctx.body = JSON.stringify(del)
      break
    case ALL:
    default:
      const data = await query(findFavorite(uid))
      ctx.body = JSON.stringify({favorite: data})
  }
})

router.post('/cart', async (ctx) => {
  const { uid } = jwt.decode(ctx.request.body.token)
  let { type, goodid } = ctx.request.body

  type = Number(type)
  goodid = Number(goodid)

  if (type === ADD_TO_CART || type === DELETE) {
    if (!goodid) {
      ctx.status = 400
      return
    }
  }

  switch (type) {
    case ADD_TO_CART:
      const cart = await query(findCart(uid))
      let readyHave = false

      cart.forEach(good => {
        if (goodid === good.goodid) {
          readyHave = true
        }
      })

      if (!readyHave) {
        const add = await query(insertCart(uid, goodid))
        ctx.body = add
      } else {
        ctx.status = 200
      }
      break
    case DELETE:
      const del = await query(deleteCart(uid, goodid))
      ctx.body = del
      break
    default:
      const data = await query(findCart(uid))
      ctx.body = JSON.stringify({ cart: data })
      break;
  }
})

module.exports = router
