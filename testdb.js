const client = require('./app/models/db.js')

client.connect((err) =>{
    const collection = client.db("bone_fish_manager").collection("brand")
    collection.find({}).toArray(function(error, docs) {
        console.log(error);
        console.log(docs);
    })
    console.log(err)
})