const express = require('express')
const urlRouter = require("./routes/urlRoutes");

const app = express()
app.use(express.json())

app.use("/api/shorten", urlRouter)
module.exports = app