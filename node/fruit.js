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
          description = name,
          img = $(this).find('img').attr('src') || $(this).find('img').attr('data-lazy-img'),
          price = Number($(this).find('.p-price i').text()) || (20+Math.random()*10).toFixed(1),
          category = 5
      img = 'http://'+img.substr(2)
      items.push({name, description, img, price, category})
    })
    resolve(items)
  })
}

const urls = [
 'https://list.jd.com/list.html?cat=12218,12221',
 'https://list.jd.com/list.html?cat=12218,12221&page=2',
 'https://list.jd.com/list.html?cat=12218,12221&page=3',
 'https://list.jd.com/list.html?cat=12218,12221&page=4',
 'https://list.jd.com/list.html?cat=12218,12221&page=5',
 'https://list.jd.com/list.html?cat=12218,12221&page=6',
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