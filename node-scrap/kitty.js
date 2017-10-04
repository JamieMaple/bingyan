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
      let name = $(this).find('.p-name em').text(),
          description = $(this).find('.p-name .promo-words').text(),
          img = $(this).find('img').attr('src') || $(this).find('img').attr('data-lazy-img'),
          price = Number($(this).find('.p-price i').text()) || (20+Math.random()*10).toFixed(1),
          category = 7
      name = testString(name)
      description = testString(description) || '宠物相关'
      img = 'http://'+img.substr(2)
      items.push({name, description, img, price, category})
    })
    resolve(items)
  })
}

const urls = [
  'https://search.jd.com/Search?keyword=%E7%8B%97%E7%B2%AE&enc=utf-8&spm=2.1.1',
  'https://search.jd.com/Search?keyword=%E7%8B%97%E7%AA%9D&enc=utf-8&wq=gou%27wo&pvid=f8cf209402aa48048b24264ac51a5c9a',
  'https://search.jd.com/Search?keyword=%E7%8C%AB%E7%AA%9D&enc=utf-8&wq=mao%27wo&pvid=835cf19a581f4cdfa853d81e2c01ed83',
  'https://search.jd.com/Search?keyword=%E7%8B%97%E7%BD%90%E5%A4%B4&enc=utf-8&spm=2.1.3',
  'https://search.jd.com/Search?keyword=%E7%8C%AB%E7%BD%90%E5%A4%B4&enc=utf-8&spm=2.1.4',
  'https://search.jd.com/Search?keyword=%E7%8C%AB%E7%B2%AE%20%E5%B9%BC%E7%8C%AB&enc=utf-8&spm=2.1.6',
  'https://search.jd.com/Search?keyword=%E5%A6%99%E9%B2%9C%E5%8C%85%E7%8C%AB&enc=utf-8&spm=2.1.5',
  'https://search.jd.com/Search?keyword=%E5%A6%99%E9%B2%9C%E5%8C%85%E7%8B%97&enc=utf-8&spm=2.1.8',
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