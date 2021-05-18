const Brand = require('../models/brand_model.js')
const checkToken = require('../models/checkToken.js')

exports.apiBrand = (req, res) => {
    let iduser = checkToken.tokenToId(req.params.token)
    if (iduser===null) {
        res.send({login: "false"})
    } else
    Brand.getAll(iduser,(err, data) => {
        if (err) res.send({message: "cannot access"})
        else {
            res.json({"listBrand":data})
        }
    })
}

exports.apigetById = (req, res) => {
    let iduser = checkToken.tokenToId(req.params.token)
    if (iduser===null) {
        res.send({login: "false"})
    } else
    Brand.getOne(iduser, req.params.id, (err, data) => {
        if (err) res.send({message: "cannot access"})
        else {
            res.json(data)
        }
    })
}

exports.apiCreateBrand = (req, res) => {
    let iduser = checkToken.tokenToId(req.body.token)
    if (iduser===null) {
        res.send({login: "false"})
    } else {
        const brand = new Brand({
            id_user : iduser,
            brand : req.body.brand
        })
        Brand.create(brand, (err, data) => {
            if (err) res.send({message: "cannot create"})
            else {
                res.json(data)
            }
        })
    }
}

exports.apiUpdateBrand = (req, res) => {
    let iduser = checkToken.tokenToId(req.body.token)
    if (iduser===null) {
        res.send({login: "false"})
    } else
    Brand.updateById(req.body.idbrand, iduser, req.body.brand, (err, data) => {
        if (err) res.send({message: "cannot update"})
        else {
            res.json(data)
        }
    })
}

exports.apiDeleteBrand = (req, res) => {
    let iduser = checkToken.tokenToId(req.body.token)
    if (iduser===null) {
        res.send({login: "false"})
    } else
    Brand.deleteById(req.body.idbrand, iduser, (err, data) => {
        if (err) res.send({message: "cannot delete"})
        else {
            res.json(data)
        }
    })
}