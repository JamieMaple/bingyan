var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test')

var db = mongoose.connection

db.on('error', console.error.bind(console, 'connnect error'))

db.once('open', function() {
  var kittySchema = mongoose.Schema({name: String})
  kittySchema.methods.speak = function () {
    var greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name"
    console.log(greeting)
  }
  var Kitten = mongoose.model('Kitten', kittySchema)
  var fluffy = new Kitten({ name: 'fluffy' })
  Kitten.find(function (err, kittens) {
    if (err) return console.error(err);
    console.log(kittens);
  })
})