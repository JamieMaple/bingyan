const tableNames = require('./tableNames')
const Select = require('./SQL').Select
const initLimit = 20

function keywordsToQueryOr(keywords=[]) {
  let query = []

  keywords.forEach((keyword, index) => query[index] = `"%${keyword}%"`)

  return query.join(' or ')
}

function _searchGoods(keywords = [], offset = 0, limit = initLimit) {
  if (Array.isArray(keywords)) {
    const sql = new Select(tableNames.goods)
    const keywordsQuery = keywordsToQueryOr(keywords)

    limit = Math.min(limit, initLimit)

    if (keywordsQuery) {
      const whereCondition = `name like ${keywordsQuery} or description like ${keywordsQuery}`
      return '' + sql.where(whereCondition).limit(offset, limit)
    }

    return '' + sql.limit(offset, limit)
  } else {
    throw Error(`${keywords} not array!`)
  }
}

function _searchGood(id = -1) {
  const sql = new Select(tableNames.goods)

  return '' + sql.where(`id=${id}`)
}

function _searchCategory(category, offset = 0, limit = initLimit) {
  const sql = new Select(tableNames.goods)

  limit = Math.min(limit, initLimit)

  return '' + sql.where(`category=${category}`).limit(offset, limit)
}

module.exports = {
  searchGoods: _searchGoods,
  searchGood: _searchGood,
  searchCategory: _searchCategory,
}
