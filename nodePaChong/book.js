var request = require('superagent')
var install = require('superagent-charset')
var cheerio = require('cheerio')

var items = []

request.get('https://search.jd.com/Search?keyword=%E7%94%9F%E6%B4%BB&enc=utf-8')
        .end(function(err, sres) {
          if (err) {
            console.log(err)
          }
          
          var $ = cheerio.load(sres.text)
          $('.gl-item .gl-i-wrap').each(function(index, element) {
            var name = $(this).find('.p-name em').text()
            var desc = $(this).find('.p-name .promo-words').text()
            var img = $(this).find('.err-product').attr('src') || $(this).find('.err-product').attr('data-lazy-img')
            img = img.substr(2)
            var price = $(this).find('.p-price i').text()
            var category = 1
            console.log(img)
            items.push({
              name,
              desc, 
              img, 
              price,
              category
            })
          })
        })
