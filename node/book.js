var request = require('superagent')
var install = require('superagent-charset')
var cheerio = require('cheerio')

function addItems() {
  request.get('https://search.jd.com/Search?keyword=%E7%94%9F%E6%B4%BB&enc=utf-8')
  .end(function(err, sres) {
    if (err) {
      console.log(err)
    }
    const items = []
    const $ = cheerio.load(sres.text)
    $('.gl-item .gl-i-wrap').each(function(index, element) {
      const name = $(this).find('.p-name em').text()
      const desc = $(this).find('.p-name .promo-words').text()
      const img = $(this).find('.err-product').attr('src') || $(this).find('.err-product').attr('data-lazy-img')
      img = img.substr(2)
      const price = $(this).find('.p-price i').text()
      const category = 1
      console.log(img)
      items.push({name, desc, img, price,category})
    })
  })
}



