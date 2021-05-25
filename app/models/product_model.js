const client = require('./db.js')
var ObjectId = require('mongodb').ObjectID;

const Product = function(product){
    this.id_brand = product.id_brand
    this.id_category = product.id_category
    this.id_user = product.id_user
    this.product = product.product
    this.stock = product.stock
    this.price = product.price
    this.img = product.img
}

Product.getAll = (iduser, rs) => {

    client.connect(err => {
        const collection = client.db("bone_fish_manager").collection("product")
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

Product.getOne = (iduser, id, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err, null)
        } else {
            const collection = client.db("bone_fish_manager").collection("product")
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

Product.create = (product, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err,null)
        } else {
            insertProduct(product, (data) => {
                console.log(data.ops[0])
                rs(null,data.ops[0])
                // data.ops[0]._id to get id insert
            })
        }
    })
    const insertProduct = (product ,callback) => {
        // Insert some documents { id_user: "60a32b8c069c03a5cd7de557", category: "Quat" }
        const collection = client.db("bone_fish_manager").collection("product")
        collection.insert(product, function(err, result) {
            if (err) console.log(err)
            else {
                callback(result)
            }
        });
    };
}

Product.updateById = (id_product, iduser, newproduct, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err, null)
        } else {
            const collection = client.db("bone_fish_manager").collection("product")
            collection.findOneAndUpdate({_id: new ObjectId(id_product), id_user: iduser}, {$set:  newproduct}, (error, result) => {
                if (error) {
                    rs(null, error)
                    throw error
                } else {
                    // console.log('odlProduct: '+result.value.product+'\nnewProduct: '+newproduct)
                    rs(null, result)
                }
            })
        }
    })
}

Product.updateStock = (id_product, iduser, stock, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err, null)
        } else {
            const collection = client.db("bone_fish_manager").collection("product")
            collection.findOneAndUpdate({_id: new ObjectId(id_product), id_user: iduser}, {$set: {stock: Number(stock)}}, (error, result) => {
                if (error) {
                    rs(null, error)
                    throw error
                } else {
                    console.log('odlProductStock: '+result.value.stock+'\nnewProductStock: '+stock)
                    rs(null, result)
                }
            })
        }
    })
}

Product.deleteById = (id_product, iduser, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err, null)
        } else {
            console.log(id_product)
            const collection = client.db("bone_fish_manager").collection("product")
            collection.findOneAndDelete({_id: new ObjectId(id_product), id_user: iduser}, (error, result) => {
                if (error) {
                    rs(error, null)
                    console.log("roeneee")
                    throw error
                } else {
                    console.log('deleteProduct: '+result)
                    rs(null, result)
                }
            })
        }
    })
}

module.exports = Product