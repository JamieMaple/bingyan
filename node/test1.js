var cheerio = require('cheerio')
var http = require('http')
var iconv = require('iconv-lite')

var url = 'http://www.ygdy8.net/html/gndy/dyzz/index.html'

http.get(url, function(sres) {
  var chunks = []
  sres.on('data', function(chunk) {
    chunks.push(chunk)
  })
  // chunks里面存储着网页的 html 内容，将它zhuan ma传给 cheerio.load 之后
  // 就可以得到一个实现了 jQuery 接口的变量，将它命名为 `$`
  // 剩下就都是 jQuery 的内容了
  sres.on('end', function() {
    var titles = []
    var html = iconv.decode(Buffer.concat(chunks), 'gb2312')
    var $ = cheerio.load(html, {decodeEntities: false})
    $('.co_content8 .ulink').each(function(idx, element) {
      var $element = $(element)
      titles.push({
        title: $element.text()
      })
    })
    console.log(titles)
  })
})