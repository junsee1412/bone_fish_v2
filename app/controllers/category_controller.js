const Category = require('../models/category_model.js')
const checkToken = require('../models/checkToken.js')

exports.apiCategory = (req, res) => {
    let iduser = checkToken.tokenToId(req.params.token)
    if (iduser===null) {
        res.send({login: "false"})
    } else
    Category.getAll(iduser,(err, data) => {
        if (err) res.send({message: "cannot access"})
        else {
            res.json({"listCategory":data})
        }
    })
}

exports.apigetById = (req, res) => {
    let iduser = checkToken.tokenToId(req.params.token)
    if (iduser===null) {
        res.send({login: "false"})
    } else
    Category.getOne(iduser, req.params.id, (err, data) => {
        if (err) res.send({message: "cannot access"})
        else {
            res.json(data)
        }
    })
}

exports.apiCreateCategory = (req, res) => {
    let iduser = checkToken.tokenToId(req.body.token)
    if (iduser===null) {
        res.send({login: "false"})
    } else {
        const category = new Category({
            id_user : iduser,
            category : req.body.category
        })
        Category.create(category, (err, data) => {
            if (err) res.send({message: "cannot create"})
            else {
                res.json(data)
            }
        })
    }
}

exports.apiUpdateCategory = (req, res) => {
    let iduser = checkToken.tokenToId(req.body.token)
    if (iduser===null) {
        res.send({login: "false"})
    } else
    Category.updateById(req.body.idcategory, iduser, req.body.category, (err, data) => {
        if (err) res.send({message: "cannot update"})
        else {
            res.json(data)
        }
    })
}

exports.apiDeleteCategory = (req, res) => {
    let iduser = checkToken.tokenToId(req.body.token)
    if (iduser===null) {
        res.send({login: "false"})
    } else
    Category.deleteById(req.body.idcategory, iduser, (err, data) => {
        if (err) res.send({message: "cannot delete"})
        else {
            res.json(data)
        }
    })
}