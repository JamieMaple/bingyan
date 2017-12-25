const pool = require('./connection')

function query(sql) {
  return new Promise((res, rej) => {
    pool.getConnection((err, conn) => {
      if (err) {
        rej(err)
      }
      conn.query(sql, (err, results, fields) => {
        conn.release()
        if (err) {
          rej(err)
        }
        res(results)
      })
    })
  })
}

module.exports = {
  query: query,
}
