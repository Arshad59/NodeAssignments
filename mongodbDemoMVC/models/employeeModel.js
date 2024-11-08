const mongoose = require("mongoose")
const empSchema = new mongoose.Schema({
    eid: {
        type: Number,
        required: [true, "Employee Id is needed and it should unique"],
        unique: true
    },
    first_name: {
        type: String,
        required: [true, "Emplyee Must Have A Name"],
        default: "John"
    },
    last_name: {
        type: String,
        required: [true, "Emplyee Must Have Last Name"],
        default: "Doe"
    },
    email: {
        type: String,
        required: [true, "Emplyee Must Have Unique Email"],
        unique: true
    },
    car_model:
    {
        type: String,
        required: [false, "Car model details are missing"],

    }

})
// creating collection
const EmpModel = mongoose.model("EmpModel", empSchema)

module.exports = EmpModel