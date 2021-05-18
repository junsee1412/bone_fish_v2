const User = require('../models/user_model.js')
const checkToken = require('../models/checkToken.js')

exports.apiUser = (req, res) => {
    let iduser = checkToken.tokenToId(req.params.token)
    if (iduser===null) {
        res.send({login: "false"})
    } else
    User.getAll(iduser,(err, data) => {
        if (err) res.send({message: "cannot access"})
        else {
            res.json({"listUser":data})
        }
    })
}

exports.apiLogin = (req, res) => {
    User.getLogin(req.body.email, req.body.pass, (err, data) => {
        if (err) res.send({message: "cannot login"})
        else {
            console.log(data._id)
            res.json({"token": checkToken.tokenCreate(data._id)})
        }
    })
}

exports.apiCreateUser = (req, res) => {
    const user = new User({
        email : req.body.email,
        pass : req.body.pass,
        role: false
    })
    User.create(user, (err, data) => {
        if (err) res.send({message: "cannot create"})
        else {
            res.json(data)
        }
    })
}

exports.apiUpdatePass = (req, res) => {
    let iduser = checkToken.tokenToId(req.body.token)
    if (iduser===null) {
        res.send({login: "false"})
    } else
    User.updatePassword(iduser, req.body.newpass, req.body.pass, (err, data) => {
        if (err) res.send({message: "cannot update"})
        else {
            res.json(data)
        }
    })
}

exports.apiDeleteUser = (req, res) => {
    let iduser = checkToken.tokenToId(req.body.token)
    if (iduser===null) {
        res.send({login: "false"})
    } else
    User.deleteUser(iduser, req.body.pass, (err, data) => {
        if (err) res.send({message: "cannot delete"})
        else {
            res.json(data)
        }
    })
}