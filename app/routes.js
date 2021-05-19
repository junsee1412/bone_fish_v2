module.exports = app => {
    const brand_control = require("./controllers/brand_controller.js")
    const category_control = require("./controllers/category_controller.js")
    const user_control = require('./controllers/user_controller.js')
    const product_control = require('./controllers/product_controller.js')
    const bill_control = require('./controllers/bill_controller.js')
    
    app.post('/api/brand', brand_control.apiCreateBrand)
    app.put('/api/brand', brand_control.apiUpdateBrand)
    app.get('/api/:token/brand', brand_control.apiBrand)
    app.get('/api/:token/brand/:id', brand_control.apigetById)
    app.delete('/api/brand', brand_control.apiDeleteBrand)

    app.post('/api/category', category_control.apiCreateCategory)
    app.put('/api/category', category_control.apiUpdateCategory)
    app.get('/api/:token/category', category_control.apiCategory)
    app.get('/api/:token/category/:id', category_control.apigetById)
    app.delete('/api/category', category_control.apiDeleteCategory)

    app.post('/api/product', product_control.apiCreateProduct)
    app.put('/api/product', product_control.apiUpdateProduct)
    app.get('/api/:token/product', product_control.apiProduct)
    app.get('/api/:token/product/:id', product_control.apigetById)
    app.delete('/api/product', product_control.apiDeleteProduct)

    app.post('/api/bill', bill_control.apiCreateBill)
    app.get('/api/:token/bill', bill_control.apiBill)
    app.get('/api/:token/bill/:id', bill_control.apigetById)

    app.post('/api/login', user_control.apiLogin)
    app.put('/api/user', user_control.apiUpdatePass)
    app.delete('/api/user', user_control.apiDeleteUser)
}
