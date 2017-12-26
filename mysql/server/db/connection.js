const mysql = require('mysql')

const config = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'shop'
}
const pool = mysql.createPool(config)

pool.on('enqueue', () => {
  console.log('waiting for available connection')
})

pool.on('release', (conn) => {
  console.log('connection %d released', conn.threadId)
})

module.exports = pool
