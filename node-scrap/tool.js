var request = require('superagent')
var install = require('superagent-charset')
var cheerio = require('cheerio')
var mongoose = require('mongoose')

let { testString } = require('./replaceString')

function addItems(url, resolve) {
  request.get(url)
  .end(function(err, sres) {
    if (err) {
      console.log(err)
    }
    const items = []
    const $ = cheerio.load(sres.text)
    $('.gl-item .gl-i-wrap').each(function(index, element) {
      let name = $(this).find('.p-name em').text().trim()
          description = $(this).find('.p-name .promo-words').text().trim() || '文具',
          img = $(this).find('img').attr('src') || $(this).find('img').attr('data-lazy-img'),
          price = Number($(this).find('.p-price i').text()) || (20+Math.random()*10).toFixed(1),
          category = 3
      img = 'http://'+img.substr(2)
      name = testString(name)
      description = testString(description) || '文具'
      items.push({name, description, img, price, category})
    })
    resolve(items)
  })
}

const urls = [
  'https://search.jd.com/search?keyword=%E6%96%87%E5%85%B7&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E6%96%87%E5%85%B7&cid3=4837#J_searchWrap',
  'https://search.jd.com/search?keyword=%E6%96%87%E5%85%B7&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E6%96%87%E5%85%B7&cid3=1449#J_searchWrap',
  'https://search.jd.com/search?keyword=%E6%96%87%E5%85%B7&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E6%96%87%E5%85%B7&ev=exbrand_%E6%99%A8%E5%85%89%EF%BC%88M%26G%EF%BC%89%5E&uc=0#J_searchWrap',
  'https://search.jd.com/search?keyword=%E6%96%87%E5%85%B7&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E6%96%87%E5%85%B7&cid3=4840#J_searchWrap',
  'https://search.jd.com/search?keyword=%E6%96%87%E5%85%B7&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E6%96%87%E5%85%B7&ev=exbrand_%E4%B8%89%E8%8F%B1%EF%BC%88MITSUBISHI%EF%BC%89%5E&uc=0#J_searchWrap',
  'https://search.jd.com/search?keyword=%E6%96%87%E5%85%B7&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E6%96%87%E5%85%B7&ev=exbrand_%E5%BE%97%E5%8A%9B%EF%BC%88deli%EF%BC%89%5E&uc=0#J_searchWrap',
  'https://search.jd.com/search?keyword=%E6%96%87%E5%85%B7&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E6%96%87%E5%85%B7&ev=exbrand_%E7%9C%9F%E5%BD%A9%EF%BC%88TRUECOLOR%EF%BC%89%5E&uc=0#J_searchWrap'
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