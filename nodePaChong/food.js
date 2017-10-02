var request = require('superagent')
var install = require('superagent-charset')
var cheerio = require('cheerio')

request = install(request)

// 分类 --- 零食类
var items = []

Promise.resolve().then(
  function() {
    request.get('http://store.dangdang.com/531')
    .charset('gbk')
    .end(function(err, sres) {
      var $ = cheerio.load(sres.text)
      $('.products li').each(function(index, element) {
        var name = $(this).find('.name a').text().substr(7)
        var discribe = ""
        var price = Number($(this).find('.num').text()+$(this).find('.tail').text())
        var img = $(this).find('.img img').attr('data-original')
        var category = 0
        items.push({
          name, price, discribe, img, category
        })
      })
      console.log(items)
   })
  }
)
