const Router =  require('koa-router')
const router = new Router
const { query, searchGood, searchGoods, searchCategory, searchCategories } = require('../db')

router.get('/goods', async (ctx) => {
  const { category, id, keywords="", page=0, perPage=20 } = ctx.request.query
  let data

  if (typeof id !== 'undefined') {
    data = await query(searchGood(id))
  } else if (typeof category !== 'undefined') {
    data = await query(searchCategory(category, page * perPage, perPage))
  } else {
    data = await query(searchGoods(keywords.split('+'), page * perPage, perPage))
  }
  ctx.body = data
})

router.get('/categories', async (ctx) => {
  const { category } = ctx.request.query
  const data = await query(searchCategories(category))
  ctx.body = data
})

module.exports = router
