var MongoClient = require('mongodb').MongoClient,
  assert = require('assert')

var url = 'mongodb://localhost:27017/sample'

var insertDocuments = function(db, callback) {
  // get the documents collection
  var collection = db.collection('documents')
  // insert some documents
  collection.insertMany([
    {a: 1}, {a: 2}, {a: 3}
  ], function(err, result) {
    assert.equal(err, null)
    assert.equal(3, result.result.n)
    assert.equal(3, result.ops.length)
    console.log("Inserted 3 documents into the collection")
    callback(result)
  })
  // result Contains the result document from MongoDB
  // ops Contains the documents inserted with added _id fields
  // connection Contains the connection used to perform the insert
}

var findDocuments = function(db, callback) {
  var collection = db.collection('documents')

  collection.find({a: 3}).toArray(function(err, docs) {
    assert.equal(err, null)
    console.log("Found the following rec")
    console.log(docs)
    callback(docs)
  })
}

var updateDocument = function(db, callback) {
  var collection = db.collection('documents')
  collection.updateOne({a: 2},
  {$set: {b: 1}}, function(err, result) {
    assert.equal(null, err)
    assert.equal(1, result.result.n)
    console.log("Updted the document with the field a equal to 2")
    callback(result)
  })
}

var removeDocument = function(db, callback) {
  var collection = db.collection('documents')
  collection.deleteOne({a: 3}, function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    console.log("Removed the document with the field a equal to 3")
    callback(result)
  })
}

var indexCollection = function(db, callback) {
  db.collection('documents').createIndex(
    {a: 3},
    null,
    function(err, results) {
      console.log(results)
      callback()
    }
  )
}

MongoClient.connect(url, function(err, db) {
  assert.equal(null, err)
  console.log('Connected successfully to server.')

  insertDocuments(db, function() {
    // findDocuments(db, function() {
    //   db.close()
    // })
    // updateDocument(db, function() {
    //   db.close()
    // })
    // removeDocument(db, function() {
    //   db.close()
    // })
    indexCollection(db, function() {
      db.close()
    })
  })
})