
const express = require('express')
const path = require("path")
const employeeRouter = require("./routes/employeeRoute")
const webEmployeeRouter = require("./routes/empRoutes")
const errorHandler = require("./controllers/errorrController")
const globalErrorHandler = require("./utils/ApiError")
const ApiError = require('./utils/ApiError')
// creating express app 
const app = express()
// setting view engine
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))



app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use("/api/v1/employees", employeeRouter)
app.use("/web/employees", webEmployeeRouter)

app.all("*", (req, res, next) => {
    // res.status(404).json({
    //     status:"failed",
    //     message:`${req.originalUrl} is not found .Please check again`
    // })
    // creating error
    // const error = new Error(`${req.originalUrl} is not found `)
    // error.statusCode=404
    // error.status="Bad Request"
    // passing to middleware - error middleware
    next(new ApiError(404, `${req.originalUrl} is not found`))

})
// error handling using middleware
app.use(errorHandler.errorMiddleware)
module.exports = app