const express = require("express")
const employeeController = require("./../controllers/employeeController")
const router = express.Router()


router.route("/")
    .get(employeeController.getAllEmployeeDetails)

router.route("/signup")
    .get(employeeController.showSignUp)
    .post(employeeController.addNewUser)

router.route("/delete")
    .get(employeeController.removeUser)

router.route("/update").post(employeeController.updateUser);
module.exports = router;
