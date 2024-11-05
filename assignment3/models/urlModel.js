const mongoose = require("mongoose")

const urlSchema = new mongoose.Schema({
    short_url: {
        type: String,
        required: [true, "Short url is required"]
    },
    original_url: {
        type: String,
        required: [true, "Original url is required"]
    }
})

const urlModel = mongoose.model("urlModel", urlSchema);
module.exports = urlModel