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
      let name = $(this).find('.p-name em').text()
          description = $(this).find('.p-name .promo-words').text(),
          img = $(this).find('img').attr('src') || $(this).find('img').attr('data-lazy-img'),
          price = Number($(this).find('.p-price i').text()) || (20+Math.random()*10).toFixed(1),
          category = 2
      img = 'http://'+img.substr(2)
      name = testString(name)
      description = testString(description) || '生活用品'
      items.push({name, description, img, price, category})
    })
    resolve(items)
  })
}

const urls = [
  'https://search.jd.com/search?keyword=%E7%94%9F%E6%B4%BB%E7%94%A8%E5%93%81&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E7%94%9F%E6%B4%BByong%27p&cid3=1671#J_searchWrap',
  'https://search.jd.com/search?keyword=%E7%94%9F%E6%B4%BB%E7%94%A8%E5%93%81&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E7%94%9F%E6%B4%BByong%27p&cid3=1660#J_searchWrap',
  'https://search.jd.com/search?keyword=%E7%94%9F%E6%B4%BB%E7%94%A8%E5%93%81&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E7%94%9F%E6%B4%BByong%27p&cid3=1661#J_searchWrap',
  'https://search.jd.com/search?keyword=%E7%94%9F%E6%B4%BB%E7%94%A8%E5%93%81&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E7%94%9F%E6%B4%BByong%27p&cid3=1658#J_searchWrap',
  'https://search.jd.com/search?keyword=%E7%94%9F%E6%B4%BB%E7%94%A8%E5%93%81&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E7%94%9F%E6%B4%BByong%27p&cid3=1656#J_searchWrap',
  'https://search.jd.com/search?keyword=%E7%94%9F%E6%B4%BB%E7%94%A8%E5%93%81&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E7%94%9F%E6%B4%BByong%27p&cid3=1669#J_searchWrap',
  'https://search.jd.com/search?keyword=%E7%94%9F%E6%B4%BB%E7%94%A8%E5%93%81&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E7%94%9F%E6%B4%BByong%27p&cid3=1670#J_searchWrap'
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