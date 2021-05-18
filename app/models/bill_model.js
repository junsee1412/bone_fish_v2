const client = require('./db.js')
var ObjectId = require('mongodb').ObjectID;

const Bill = function(bill){
    this.id_user = bill.id_user
    this.bill = bill.bill
    this.time = bill.time
    this.items = bill.items
}

Bill.getAll = (iduser, rs) => {

    client.connect(err => {
        const collection = client.db("bone_fish_manager").collection("bill")
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

Bill.getOne = (iduser, id, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err, null)
        } else {
            const collection = client.db("bone_fish_manager").collection("bill")
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

Bill.create = (bill, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err,null)
        } else {
            insertBill(bill, (data) => {
                console.log(data.ops[0])
                rs(null,data.ops[0])
                // data.ops[0]._id to get id insert
            })
        }
    })
    const insertBill = (bill ,callback) => {
        // Insert some documents { id_user: "60a32b8c069c03a5cd7de557", category: "Quat" }
        const collection = client.db("bone_fish_manager").collection("bill")
        collection.insert(bill, function(err, result) {
            if (err) console.log(err)
            else {
                callback(result)
            }
        });
    };
}

module.exports = Bill