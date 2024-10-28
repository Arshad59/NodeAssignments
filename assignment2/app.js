const express = require("express")
const routes = require("./routes/weatherRoutes");
const port = process.env.PORT || 3000

const app = express();
app.use(express.json());
app.use("/api/",routes);

app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})