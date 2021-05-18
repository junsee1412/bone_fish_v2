const client = require('./db.js')
var ObjectId = require('mongodb').ObjectID;

const User = function(user){
    this.name_user = user.name_user
    this.pass_user = user.pass_user
    this.role = user.role
}

User.getAll = (iduser, rs) => {

    client.connect(err => {
        const collection = client.db("bone_fish_manager").collection("user")
        if (err) {
            rs(err,null)
            console.log(err)
        } else {
            collection.find({role: false}).toArray(function(error, docs) {
                if (error) {
                    rs(null, error)
                    console.log(error)
                } else rs(null, docs)
            })
        }
    })
}

User.useAdmin = (iduser, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err, null)
        } else {
            const collection = client.db("bone_fish_manager").collection("user")
            collection.findOne({id_user: iduser, role: true}, (error, result) => {
                if (error) {
                    rs(null, {admin: 'false'})
                    console.log(error)
                } else {
                    console.log(result)
                    rs(null, {admin: 'true'})
                }
            })
        }
    })
}

User.getLogin = (email, pass, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err, null)
        } else {
            const collection = client.db("bone_fish_manager").collection("user")
            collection.findOne({email: email, pass: pass}, (error, result) => {
                if (error) {
                    rs(null, error)
                    console.log(error)
                } else {
                    console.log(result)
                    rs(null,result)
                }
            })
        }
    })
}

User.create = (user, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err, null)
        } else {
            insertBrand(user, (data) => {
                console.log(data)
                rs(null, data)
                // data.ops[0]._id to get id insert
            })
        }
    })
    const insertBrand = (user ,callback) => {
        // Insert some documents { id_user: "60a32b8c069c03a5cd7de557", category: "Quat" }
        const collection = client.db("bone_fish_manager").collection("user")
        collection.insert(user, function(err, result) {
            if (err) {
                console.log(err)
                callback({message: 'cannot create'})
                return
            } else {
                callback(result)
            }
        });
    };
}

User.updatePassword = (iduser, newpass, pass, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err, null)
        } else {
            const collection = client.db("bone_fish_manager").collection("user")
            collection.findOneAndUpdate({_id: new ObjectId(iduser), pass: pass}, {$set: {pass: newpass}}, (error, result) => {
                if (error) {
                    rs(null, error)
                    console.log(error)
                    return
                } else {
                    console.log('odlPass: '+result.value.pass+'\nnewPass: '+newpass)
                    rs(null, {message:'update success'})
                }
            })
        }
    })
}

User.deleteUser = (iduser, pass, rs) => {
    client.connect(err => {
        if (err) {
            console.log(err)
            rs(err, null)
        } else {
            const collection = client.db("bone_fish_manager").collection("user")
            collection.findOneAndDelete({_id: new ObjectId(iduser), pass: pass}, (error, result) => {
                if (error) {
                    rs(null, {message: "cannot delete"})
                    console.log(error)
                    return
                } else {
                    console.log('deleteUser: '+result.value.email)
                    // rs(null, result)
                    rs(null,{message:'delete success'})
                }
            })
        }
    })
}

module.exports = User