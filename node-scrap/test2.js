var express = require('express')
var request = require('superagent')
var cheerio = require('cheerio')

var app = express()

app.get('/', function(req, res, next) {
  request.get('https://cnodejs.org')
         .end(function(err, sres) {
           if (err) {
             return next(err)
           }
           var $ = cheerio.load(sres.text)
           var items = []

           $('#topic_list .topic_title').each(function(idx, element) {
             var $element = $(element)
             items.push({
               title: $element.attr('title'),
               herf: $element.attr('href')
             })
           })

           res.send(sres.text)
         })
})

app.listen(3000, function() {
  console.log('app is listening at port 3000')
})