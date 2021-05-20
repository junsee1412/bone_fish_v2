const User = require('../models/user_model.js')
const checkToken = require('../models/checkToken.js')

exports.apiUser = (req, res) => {
    let iduser = checkToken.tokenToId(req.params.token)
    if (iduser===null) {
        res.status(500).send({message: "please login"})
    } else
    User.getAll(iduser,(err, data) => {
        if (err) res.status(500).send({message: "cannot access"})
        else {
            res.json(data)
        }
    })
}

exports.apiLogin = (req, res) => {
    User.getLogin(req.body.email, req.body.pass, (err, data) => {
        if (err) res.status(500).send({message: "cannot login"})
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
        if (err) res.status(500).send({message: "cannot create"})
        else {
            res.json({message:'create success'})
        }
    })
}

exports.apiUpdatePass = (req, res) => {
    let iduser = checkToken.tokenToId(req.body.token)
    if (iduser===null) {
        res.status(500).send({message: "please login"})
    } else
    User.updatePassword(iduser, req.body.newpass, req.body.pass, (err, data) => {
        if (err) res.status(500).send({message: "cannot update"})
        else {
            res.json({message:'update success'})
        }
    })
}

exports.apiDeleteUser = (req, res) => {
    let iduser = checkToken.tokenToId(req.body.token)
    if (iduser===null) {
        res.status(500).send({message: "please login"})
    } else
    User.deleteUser(iduser, req.body.pass, (err, data) => {
        if (err) res.status(500).send({message: "cannot delete"})
        else {
            res.json({message:'delete success'})
        }
    })
}