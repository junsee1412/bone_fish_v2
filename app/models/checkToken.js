const jwt = require('jsonwebtoken');

exports.tokenCreate = (idUser) => {
    let token
    return token = jwt.sign({id_user : idUser}, "id")
}

exports.tokenToId = (token) => {
    let idUser
    try {
        idUser = jwt.verify(token,"id").id_user
        return idUser
    } catch(err) {
        console.log(err)
        return idUser = null
    }
}