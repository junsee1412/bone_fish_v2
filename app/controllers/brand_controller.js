const Brand = require('../models/brand_model.js')
const checkToken = require('../models/checkToken.js')

exports.apiBrand = (req, res) => {
    let iduser = checkToken.tokenToId(req.params.token)
    if (iduser===null) {
        res.status(500).send({message: "please login"})
    } else
    Brand.getAll(iduser,(err, data) => {
        if (err) res.status(500).send({message: "cannot access"})
        else {
            res.json(data)
        }
    })
}

exports.apigetById = (req, res) => {
    let iduser = checkToken.tokenToId(req.params.token)
    if (iduser===null) {
        res.status(500).send({message: "please login"})
    } else
    Brand.getOne(iduser, req.params.id, (err, data) => {
        if (err) res.status(500).send({message: "cannot access"})
        else {
            res.json(data)
        }
    })
}

exports.apiCreateBrand = (req, res) => {
    let iduser = checkToken.tokenToId(req.body.token)
    if (iduser===null) {
        res.status(500).send({message: "please login"})
    } else {
        const brand = new Brand({
            id_user : iduser,
            brand : req.body.brand
        })
        Brand.create(brand, (err, data) => {
            if (err) res.status(500).send({message: "cannot create"})
            else {
                res.json({message:'create success'})
            }
        })
    }
}

exports.apiUpdateBrand = (req, res) => {
    let iduser = checkToken.tokenToId(req.body.token)
    if (iduser===null) {
        res.status(500).send({message: "please login"})
    } else
    Brand.updateById(req.body.idbrand, iduser, req.body.brand, (err, data) => {
        if (err) res.status(500).send({message: "cannot update"})
        else {
            res.json({message:'update success'})
        }
    })
}

exports.apiDeleteBrand = (req, res) => {
    let iduser = checkToken.tokenToId(req.body.token)
    if (iduser===null) {
        res.status(500).send({message: "please login"})
    } else
    Brand.deleteById(req.body.idbrand, iduser, (err, data) => {
        if (err) res.status(500).send({message: "cannot delete"})
        else {
            res.json({message:'delete success'})
        }
    })
}