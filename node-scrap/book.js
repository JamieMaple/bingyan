var request = require('superagent')
var install = require('superagent-charset')
var cheerio = require('cheerio')
var mongoose = require('mongoose')

var { testString } = require('./replaceString')

function addItems(url, resolve) {
  request.get(url)
  .end(function(err, sres) {
    if (err) {
      console.log(err)
    }
    const items = []
    const $ = cheerio.load(sres.text)
    $('.gl-item .gl-i-wrap').each(function(index, element) {
      let name = $(this).find('.p-name em').text()
          description = $(this).find('.p-name .promo-words').text(),
          img = $(this).find('img').attr('src') || $(this).find('img').attr('data-lazy-img'),
          price = Number($(this).find('.p-price i').text()) || (20+Math.random()*10).toFixed(1),
          category = 1
      name = testString(name)
      description = testString(description) || '图书',
      img = 'http:'+img
      items.push({name, description, img, price, category})
    })
    resolve(items)
  })
}

const urls = [
  'https://search.jd.com/Search?keyword=%E7%94%9F%E6%B4%BB&enc=utf-8',
  'https://list.jd.com/list.html?cat=1713,3272',
  'https://search.jd.com/Search?keyword=%E7%94%9F%E6%B4%BB&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&page=3&s=55&click=0',
  'https://list.jd.com/list.html?cat=1713,3272&page=2&sort=sort_rank_asc&trans=1&JL=6_0_0#J_main',
  'https://list.jd.com/list.html?cat=1713,3260'
]

const res = urls.map((url) => 
  new Promise((resolve, resject) => {
    addItems(url, resolve)
  })
)

Promise.all(res).then((itemsArr) => {
  const items = []
  itemsArr.forEach(itemsArrItem => {
    items.push(...itemsArrItem)
  })
  console.log(items.length)
  return
  mongoose.connect('mongodb://localhost/Shop', {
    useMongoClient: true
  })
  var Good = mongoose.model('goods', {
    name: String,
    description: String,
    img: String,
    price: String,
    category: Number
  })
  items.forEach(item => {
    var good = new Good(item)
    good.save(function(err) {
      if (err) {
        console.log(err)
      }
    })
  })
  console.log(items.length,' insertions successful!')
})