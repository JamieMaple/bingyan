const express = require('express')
const cors = require('cors')

const app = express()


var data = require('./food.json')

app.get('/api', (req, res) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

  res.send(data)
})

app.listen(3001, () => {
  console.log('listening on the port 3001')
})