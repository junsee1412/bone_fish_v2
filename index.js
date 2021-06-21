const express = require("express")
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const app = express()
const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'))
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'))
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'))
app.use('/popperjs', express.static(__dirname + '/node_modules/@popperjs/core/lib'))
app.use(express.static('public'));

app.use('/storage', express.static(__dirname + '/storage'))

app.set("view engine", "ejs")
app.set("views", "./app/views")

require("./app/routes.js")(app)

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})