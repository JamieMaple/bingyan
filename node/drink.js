var request = require('superagent')
var install = require('superagent-charset')
var cheerio = require('cheerio')
var mongoose = require('mongoose')

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
          description = $(this).find('.p-name .promo-words').text().trim() || '饮料',
          img = $(this).find('img').attr('src') || $(this).find('img').attr('data-lazy-img'),
          price = Number($(this).find('.p-price i').text()) || (20+Math.random()*10).toFixed(1),
          category = 6
      img = 'http://'+img.substr(2)
      items.push({name, description, img, price, category})
    })
    resolve(items)
  })
}

const urls = [
  'https://search.jd.com/search?keyword=%E9%A5%AE%E6%96%99&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E9%A5%AE%E6%96%99&stock=1&cid3=1602#J_searchWrap',
  'https://search.jd.com/search?keyword=%E9%A5%AE%E6%96%99&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E9%A5%AE%E6%96%99&cid2=1585&cid3=1602&stock=1&ev=1107_80367%5E&uc=0#J_searchWrap',
  'https://search.jd.com/search?keyword=%E9%A5%AE%E6%96%99&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E9%A5%AE%E6%96%99&cid2=1585&cid3=1602&stock=1&ev=1107_80372%5E&uc=0#J_searchWrap',
  'https://search.jd.com/search?keyword=%E9%A5%AE%E6%96%99&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E9%A5%AE%E6%96%99&cid2=1585&cid3=1602&stock=1&ev=1107_80372%5E&uc=0#J_searchWrap',
  'https://search.jd.com/search?keyword=%E9%A5%AE%E6%96%99&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E9%A5%AE%E6%96%99&cid2=1585&cid3=1602&stock=1&ev=1107_9799%5E&uc=0#J_searchWrap',
  'https://search.jd.com/search?keyword=%E9%A5%AE%E6%96%99&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E9%A5%AE%E6%96%99&cid2=1585&cid3=1602&stock=1&ev=4515_32939%5E&uc=0#J_searchWrap',
  'https://search.jd.com/search?keyword=%E9%A5%AE%E6%96%99&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E9%A5%AE%E6%96%99&cid2=1585&cid3=1602&ev=4515_32939%5E&stock=1&page=3&s=54&click=0',
  'https://search.jd.com/search?keyword=%E9%A5%AE%E6%96%99&enc=utf-8&qrst=1&rt=1&stop=1&vt=2&wq=%E9%A5%AE%E6%96%99&cid2=1585&cid3=1602&stock=1&ev=1107_80366%5E&uc=0#J_searchWrap'
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