var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27018/";
let data = require("./locations.json")
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("testCollection").insertMany(data, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });
