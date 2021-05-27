const client = require('./db.js')
var ObjectId = require('mongodb').ObjectID;

const Category = function(category){
    this.id_user = category.id_user
    this.category = category.category
}

Category.getAll = (iduser, rs) => {

    client.connect(err => {
        const collection = client.db("bone_fish_manager").collection("category")
        if (err) {
            console.log(err)
            rs(err,null)
        } else {
            collection.find({id_user: iduser}).toArray(function(error, docs) {
                if (error)
                {
                    console.log(error)
                    rs(null, error)
                    return
                } else {
                    rs(null, docs)
                    console.log(docs)
                }
            })
        }
    })
}

Category.getOne = (iduser, id, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err, null)
        } else {
            const collection = client.db("bone_fish_manager").collection("category")
            collection.findOne({_id: new ObjectId(id), id_user: iduser}, (error, result) => {
                if (error) {
                    rs(null, error)
                    throw error
                } else {
                    console.log(result)
                    rs(null,result)
                }
            })
        }
    })
}

Category.create = (category, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err,null)
        } else {
            insertCategory(category, (data) => {
                console.log(data.ops[0])
                rs(null,data.ops[0])
                // data.ops[0]._id to get id insert
            })
        }
    })
    const insertCategory = (category ,callback) => {
        // Insert some documents { id_user: "60a32b8c069c03a5cd7de557", category: "Quat" }
        const collection = client.db("bone_fish_manager").collection("category")
        collection.insert(category, function(err, result) {
            if (err) console.log(err)
            else {
                callback(result)
            }
        });
    };
}

Category.updateById = (id_category, iduser, newcategory, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err, null)
        } else {
            const collection = client.db("bone_fish_manager").collection("category")
            collection.findOneAndUpdate({_id: new ObjectId(id_category), id_user: iduser}, {$set: {category: newcategory}}, (error, result) => {
                if (error) {
                    rs(null, error)
                    throw error
                } else {
                    console.log('odlCategory: '+result.value.category+'\nnewCategory: '+newcategory)
                    rs(null, result)
                }
            })
        }
    })
}

Category.deleteById = (id_category, iduser, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err, null)
        } else {
            const collection = client.db("bone_fish_manager").collection("category")
            collection.findOneAndDelete({_id: new ObjectId(id_category), id_user: iduser}, (error, result) => {
                if (error) {
                    rs(null, error)
                    throw error
                } else {
                    rs(null, result)
                }
            })
        }
    })
}

module.exports = Category