let request = require('superagent')
let install = require('superagent-charset')
let cheerio = require('cheerio')
let mongoose = require('mongoose')

let { testString } = require('./replaceString')

request = install(request)

// 分类 --- 零食类

function addItems(num, resolve) {
  request.get('http://store.dangdang.com/531?page_index='+num)
  .charset('gbk')
  .end(function(err, sres) {
    let $ = cheerio.load(sres.text)
    const items = []
    $('.products li').each(function(index, element) {
      let name = $(this).find('.name a').text(),
          description = '小零食',
          price = Number($(this).find('.num').text()+$(this).find('.tail').text()),
          img = $(this).find('.img img').attr('data-original'),
          category = 0
      name = testString(name)
      items.push({
        name, price, description, img, category
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
    var Good = mongoose.model('goods', {
      name: String,
      description: String,
      img: String,
      category: Number,
      price: Number
    })
    items.forEach((item, index) => {
      var good = new Good(item)
      good.save(function(err, good) {
        if (err) {
          console.log(errr)
        }
      })
    })
    console.log(items.length, ' successful!')
  })
})