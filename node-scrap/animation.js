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
          category = 8
      name = testString(name)
      description = testString(description) || '动漫周边'
      img = 'http://'+img.substr(2)
      items.push({name, description, img, price, category})
    })
    resolve(items)
  })
}

const urls = [
  'https://search.jd.com/Search?keyword=%E4%BA%8C%E6%AC%A1%E5%85%83%E5%91%A8%E8%BE%B9&enc=utf-8&spm=2.1.0',
  'https://search.jd.com/Search?keyword=%E5%8A%A8%E6%BC%AB%E6%B5%B7%E6%8A%A5&enc=utf-8&spm=2.1.4',
  'https://search.jd.com/Search?keyword=%E4%BA%8C%E6%AC%A1%E5%85%83%E5%91%A8%E8%BE%B9&enc=utf-8&qrst=1&rt=1&stop=1&spm=2.1.0&vt=2&stock=1&page=3&s=57&click=0',
  'https://search.jd.com/Search?keyword=%E5%8A%A8%E6%BC%AB%E6%B0%B4%E6%9D%AF&enc=utf-8&spm=2.1.9',
  'https://search.jd.com/Search?keyword=%E6%97%A5%E6%9C%AC%E5%8A%A8%E6%BC%AB%E5%91%A8%E8%BE%B9&enc=utf-8&qrst=1&rt=1&stop=1&spm=2.1.5&vt=2&stock=1&page=5&s=121&click=0',
  'https://search.jd.com/Search?keyword=%E4%BA%8C%E6%AC%A1%E5%85%83&enc=utf-8&qrst=1&rt=1&stop=1&spm=2.1.4&vt=2&stock=1&page=11&s=296&click=0',
  'https://search.jd.com/Search?keyword=%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9%E6%97%97%E8%88%B0%E5%BA%97&enc=utf-8&spm=2.1.3',
  'https://search.jd.com/Search?keyword=%E4%BA%8C%E6%AC%A1%E5%85%83&enc=utf-8&spm=2.1.7'
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
  // console.log(items.length)
  // return
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