const app = require("./app")
const dotenv = require("dotenv")
const mongoose = require("mongoose")

dotenv.config({ path: "./config.env" })
//console.log(process.env)

const port = process.env.PORT || 3000
// connection
mongoose.connect(
    process.env.DB_LOCAL

).then(con => {

    console.log("Connection done successfull")
    //console.log(con.connection)
}).catch((err) => {
    console.log("Connection failed", err)
})

app.listen(port, () => {
    console.log(`Express app is running in ${port}`)
})