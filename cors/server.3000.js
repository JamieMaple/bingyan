const express = require('express')
const path = require('path')
const app = express()

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
})

app.get('/api', (req, res) => {
  res.send(require('./data.json'))
})

app.listen(3000, () => {
  console.log('running on the port 3000')
})