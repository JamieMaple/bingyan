const tableNames = require('./tableNames')
const Select = require('./SQL').Select

function _searchCategories(categoryid) {
  const sql = new Select(tableNames.categories)

  if (categoryid) {
    return '' + sql.where(`id=${categoryid}`)
  } else {
    return '' + sql
  }
}

module.exports = {
  searchCategories: _searchCategories,
}
