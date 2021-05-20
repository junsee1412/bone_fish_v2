const Bill = require('../models/bill_model.js')
const checkToken = require('../models/checkToken.js')

exports.apiBill = (req, res) => {
    let iduser = checkToken.tokenToId(req.params.token)
    if (iduser===null) {
        res.status(500).send({message: "please login"})
    } else
    Bill.getAll(iduser,(err, data) => {
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
    Bill.getOne(iduser, req.params.id, (err, data) => {
        if (err) res.status(500).send({message: "cannot access"})
        else {
            res.json(data)
        }
    })
}

exports.apiCreateBill = (req, res) => {
    let iduser = checkToken.tokenToId(req.body.token)
    if (iduser===null) {
        res.status(500).send({message: "please login"})
    } else {
        const bill = new Bill({
            id_user : iduser,
            bill : req.body.bill,
            time : new Date(),
            items : req.body.items
        })
        Bill.create(bill, (err, data) => {
            if (err) res.status(500).send({message: "cannot create"})
            else {
                res.json({message:'create success'})
            }
        })
    }
}