const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa
const router = new Router
const PORT = process.env.PORT || 3000

// routes
const routers = require('./router')

router
  .all('/', async (ctx, next) => {
    ctx.body = {data: "test"}
  })

router.use('/api', routers.publicRouter.routes())

router.use('/user', routers.userRouter.routes())

router.use('/auth', routers.userActionRouter.routes())

app.use(router.routes())

app.listen(PORT, () => {
  console.log(`> Server running at port ${PORT}.`)
})
