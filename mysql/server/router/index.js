const publicRouter     = require('./public')
const userRouter       = require('./users')
const userActionRouter = require('./usersAction')

module.exports = {
  publicRouter: publicRouter,
  userRouter: userRouter,
  userActionRouter: userActionRouter,
}
