const express = require('express')
const ApiError = require("./utils/ApiError")
const urlRouter = require("./routes/urlRoutes");

const app = express()
app.use(express.json())

app.use("/api/shorten", urlRouter)

app.all("*", (req, res, next) => {
    next(new ApiError(404, `${req.originalUrl} is not found`))
})
module.exports = app