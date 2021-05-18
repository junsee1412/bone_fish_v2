const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ad1:kali1412@cluster0.rqt33.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


// client.connect(err => {
//   const collection = client.db("bone_fish_manager").collection("category")
//   collection.find({}).toArray(function(error, docs) {
//     console.log(error);
//     console.log(docs);
//   })
//   console.log(err)
// })

module.exports = client