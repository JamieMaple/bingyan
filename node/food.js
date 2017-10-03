let request = require('superagent')
let install = require('superagent-charset')
let cheerio = require('cheerio')
let mongoose = require('mongoose')

request = install(request)

// 分类 --- 零食类

function addItems(num, resolve) {
  request.get('http://store.dangdang.com/531?page_index='+num)
  .charset('gbk')
  .end(function(err, sres) {
    let $ = cheerio.load(sres.text)
    const items = []
    $('.products li').each(function(index, element) {
      let name = $(this).find('.name a').text().substr(7)
      let discribe = ""
      let price = Number($(this).find('.num').text()+$(this).find('.tail').text())
      let img = $(this).find('.img img').attr('data-original')
      let category = 0
      items.push({
        name, price, discribe, img, category
      })
    })
    resolve(items)
 })
}

res = [0, 0, 0].map((item, index) => 
  new Promise((resolve, reject) => {
    addItems(index + 1, resolve)
  })
)

Promise.all(res).then((itemsArr) => {
  const items = [...itemsArr[0], ...itemsArr[1], ...itemsArr[2]]
  console.log(items.length)
  return
  mongoose.connect('mongodb://localhost/Shop')
  const db = mongoose.connection
  
  db.on('error', function() {
    console.log('error')
  })
  db.once('open', function() {
    const Schema = mongoose.Schema
    const GoodSchema = new Schema({
      name: String,
      description: String,
      price: Number,
      img: String,
      category: Number
    })
    const GoodModel = mongoose.model('Good', GoodSchema)
    GoodModel.create(items, function(err, goods) {
      if (err) {
        console.log(err)
      }
      console.log('successful!')
    })
  })
})
