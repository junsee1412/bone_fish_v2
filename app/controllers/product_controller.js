const Product = require('../models/product_model.js')
const checkToken = require('../models/checkToken.js')
const multer = require("multer")
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,'./storage')
  },
  filename: (req, file, cb) => {
    let type = file.originalname
    let index = type.lastIndexOf(".")
      //+file.mimetype.slice(6,12)
    cb(null,""+Date.now()+type.slice(index, 50))
  }
})
const upload = multer({ storage: storage }).single('image')

exports.apiProduct = (req, res) => {
    let iduser = checkToken.tokenToId(req.params.token)
    if (iduser===null) {
        res.json({message: "please login"})
    } else
    Product.getAll(iduser,(err, data) => {
        if (err) res.json({message: "cannot access"})
        else {
            res.json(data)
        }
    })
}

exports.apigetById = (req, res) => {
    let iduser = checkToken.tokenToId(req.params.token)
    if (iduser===null) {
        res.json({message: "please login"})
    } else
    Product.getOne(iduser, req.params.id, (err, data) => {
        if (err) res.json({message: "cannot access"})
        else {
            res.json(data)
        }
    })
}

exports.apiCreateProduct = (req, res) => {
    upload(req, res, (error) => {
        if (error instanceof multer.MulterError) {
            console.log(error)
            res.json({message: 'cannot upfile 1'})
        } else if (error) {
            console.log(error)
            res.json({message: 'cannot upfile 2'})
        } else {
            let iduser = checkToken.tokenToId(req.body.token)
            if (iduser===null) {
                res.json({message: "please login"})
            } else {
                console.log(req.file.originalbame)
                const product = new Product({
                    id_brand : req.body.idbrand,
                    id_category : req.body.idcategory,
                    id_user : iduser,
                    product : req.body.product,
                    stock : Number(req.body.stock),
                    price : Number(req.body.price),
                    img : "/"+req.file.path 
                })
                console.log(req.file);
                Product.create(product, (err, data) => {
                    if (err) res.json({message: "cannot create"})
                    else {
                        // res.json({message:'create success'})
                        res.json(data)
                    }
                })
            }
        }
    })
}

exports.apiUpdateProduct = (req, res) => {
    let iduser = checkToken.tokenToId(req.body.token)
    if (iduser===null) {
        res.json({message: "please login"})
    } else
    Product.updateById(req.body.idproduct, iduser, {product: req.body.product, stock: Number(req.body.stock), price: Number(req.body.price)}, (err, data) => {
        if (err) res.json({message: "cannot update"})
        else {
            res.json({message:'update success'})
        }
    })
}

exports.apiDeleteProduct = (req, res) => {
    let iduser = checkToken.tokenToId(req.body.token)
    if (iduser===null) {
        res.json({message: "please login"})
    } else
    Product.deleteById(req.body.idproduct, iduser, (err, data) => {
        if (err) res.json({message: "cannot delete"})
        else {
            res.json({message:'delete success'})
        }
    })
}