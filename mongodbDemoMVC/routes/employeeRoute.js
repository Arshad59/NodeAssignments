const express = require("express")
const employeeController = require("./../controllers/employeeController")
const router = express.Router()


router.route("/")
    .get(employeeController.getAllEmployees)
    .post(employeeController.addNewEmployee)
router.route("/:id")
    .get(employeeController.getEmployee)
    .patch(employeeController.updateEmployee)
    .delete(employeeController.removeEmployee)

// router.route("/:id")
//   .get(employeeHandler.getEmployee)
//   .delete(employeeHandler.removeEmployee)

module.exports = router;