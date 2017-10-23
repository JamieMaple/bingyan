const crypto = require('crypto')

const code = 'test'

const sha256 = crypto.createHmac('sha256', 'test')
  .update('utf8')
  .digest('base64')

console.log(sha256)