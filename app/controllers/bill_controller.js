const Bill = require('../models/bill_model.js')
const checkToken = require('../models/checkToken.js')

exports.apiBill = (req, res) => {
    let iduser = checkToken.tokenToId(req.params.token)
    if (iduser===null) {
        res.send({login: "false"})
    } else
    Bill.getAll(iduser,(err, data) => {
        if (err) res.send({message: "cannot access"})
        else {
            res.json({"listBill":data})
        }
    })
}

exports.apigetById = (req, res) => {
    let iduser = checkToken.tokenToId(req.params.token)
    if (iduser===null) {
        res.send({login: "false"})
    } else
    Bill.getOne(iduser, req.params.id, (err, data) => {
        if (err) res.send({message: "cannot access"})
        else {
            res.json(data)
        }
    })
}

exports.apiCreateBill = (req, res) => {
    let iduser = checkToken.tokenToId(req.body.token)
    if (iduser===null) {
        res.send({login: "false"})
    } else {
        const bill = new Bill({
            id_user : iduser,
            bill : req.body.bill,
            time : new Date(),
            items : req.body.items
        })
        Bill.create(bill, (err, data) => {
            if (err) res.send({message: "cannot create"})
            else {
                res.json(data)
            }
        })
    }
}