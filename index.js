//import dependencies
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const connectDB = require("./config/db")
const passport = require("passport")
const bodyParser = require("body-parser")
const router = require("./routes/api_services")

connectDB()

const app = express()
if (process.env.NODE_ENV === 'developer') {
    app.use(morgan('dev'))
}
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(router)
app.use(passport.initialize())
require("./config/passport")(passport)

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server Running in ${process.env.NODE_ENV} mode : ${PORT}`))