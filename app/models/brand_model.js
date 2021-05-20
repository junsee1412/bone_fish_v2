const client = require('./db.js')
var ObjectId = require('mongodb').ObjectID;

const Brand = function(brand){
    this.id_user = brand.id_user
    this.brand = brand.brand
}

Brand.getAll = (iduser, rs) => {

    client.connect(err => {
        const collection = client.db("bone_fish_manager").collection("brand")
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

Brand.getOne = (iduser, id, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err, null)
        } else {
            const collection = client.db("bone_fish_manager").collection("brand")
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

Brand.create = (brand, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err,null)
        } else {
            insertBrand(brand, (data) => {
                console.log(data.ops[0])
                rs(null, data)
                // data.ops[0]._id to get id insert
            })
        }
    })
    const insertBrand = (brand ,callback) => {
        // Insert some documents { id_user: "60a32b8c069c03a5cd7de557", category: "Quat" }
        const collection = client.db("bone_fish_manager").collection("brand")
        collection.insert(brand, function(err, result) {
            if (err) console.log(err)
            else {
                callback(result)
            }
        });
    };
}

Brand.updateById = (id_brand, iduser, newbrand, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err, null)
        } else {
            const collection = client.db("bone_fish_manager").collection("brand")
            collection.findOneAndUpdate({_id: new ObjectId(id_brand), id_user: iduser}, {$set: {brand: newbrand}}, (error, result) => {
                if (error) {
                    rs(null, error)
                    throw error
                } else {
                    console.log('odlBrand: '+result.value.brand+'\nnewBrand: '+newbrand)
                    rs(null, result)
                }
            })
        }
    })
}

Brand.deleteById = (id_brand, iduser, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err, null)
        } else {
            const collection = client.db("bone_fish_manager").collection("brand")
            collection.findOneAndDelete({_id: new ObjectId(id_brand), id_user: iduser}, (error, result) => {
                if (error) {
                    rs(null, error)
                    throw error
                } else {
                    console.log('deleteBrand: '+result.value.brand)
                    rs(null, result)
                }
            })
        }
    })
}

module.exports = Brand