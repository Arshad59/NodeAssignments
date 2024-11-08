const ApiError = require("../utils/ApiError")
const empModel = require("./../models/employeeModel")
const logger = require("./../utils/logger")

exports.addNewEmployee = async (req, res) => {
    try {
        const newEmployee = await empModel.create(req.body)
        res.status(201).json(
            {
                status: "Success",
                msg: "Employee added Successfully",
                data: {
                    employee: newEmployee
                }
            }
        )
    }
    catch (err) {
        console.log("Employee failed to save")
        res.status(400).json(
            {
                status: "Failed",
                msg: "Employee Registeration Failed"
            }
        )
    }

}

exports.getAllEmployees = async (req, res) => {
    try {
        const employees = await empModel.find()
        //console.log(logger)
        logger.log("info", "Successfully fetched all employee details")
        res.status(200).json({
            status: "Success",
            results: employees.length,
            data: {
                employeeDetails: employees
            }
        })


    }
    catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })


    }


}

exports.getEmployee = async (req, res, next) => {
    try {
        const emp = await empModel.findById(req.params.id)
        // empModel.findOne({eid:req.params.eid})
        //log(level,msg)
        logger.log("info", `Successfully fetched  employee  details ${req.params.id}`)
        res.status(200).json({
            status: "Success",
            data: {
                employeeDetails: emp
            }
        })
    }
    catch (err) {
        logger.log("error", `Failed to  fetched mployee  details ${req.params.id}`)
        next(new ApiError(500, `${req.params.id} is not found`))

    }

}
exports.updateEmployee = async (req, res, next) => {
    try {
        const emp = await empModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            includeResultMetadata: true

        })

        res.status(200).json({
            status: "Success",
            data: {
                newEmployeeDetails: emp
            }
        })
    }
    catch (err) {
        //   res.status(404).json({
        //     status:"fail to update",
        //     message:err.message,
        //     details: "Please check employee id"
        //  })
        next(new ApiError(404, `${req.params.id} is not found. Failed to update`))

    }

}

exports.removeEmployee = async (req, res) => {
    try {

        const emp = await empModel.findByIdAndDelete(req.params.id)
        if (emp) {
            res.status(200).json({
                status: "Removed Successfully",
                data: {
                    removedEmployeeDetails: emp
                }

            })

        }
    }
    catch (err) {
        res.status(404).json({
            status: "fail to remove employee",
            message: err.message,
            details: "Please check employee id"
        })

    }
}

exports.getAllEmployeeDetails = async (req, res) => {
    const allEmployees = await empModel.find()
    return res.render("employees", {
        allemployeesDetails: allEmployees
    })
}

exports.addNewUser = async (req, res, next) => {

    try {
        console.log(req.body)
        const newEmployee = await empModel.create({
            eid: req.body.empid * 1,
            fist_name: req.body.efn,
            last_name: req.body.eln,
            email: req.body.email
        })
        console.log(newEmployee)
        if (newEmployee != null) {
            return res.render("login")
        }

    }
    catch (err) {

        next(new ApiError(404, `${err} is not found. Failed to update`))
    }

}

exports.showSignUp = async (req, res) => {

    return res.render("singup")

}
exports.removeUser = async (req, res, next) => {
    try {

        const remove = await empModel.findByIdAndDelete(req.query.eid)
        //const allEmployees = await empModel.find()
        const allEmployees = await empModel.find()
        return res.render("employees", {
            allemployeesDetails: allEmployees
        })
    }
    catch (err) {

        next(new ApiError(404, `${err} is not found. Failed to delete`))
    }

}

exports.updateUser = async (req, res) => {
    try {
        const {id, first_name,last_name,email,car_model} = req.body;
        const updatedEmployee= await empModel.findByIdAndUpdate(
            id,
            {
                first_name,
                last_name,
                email,
                car_model
            },
            {
                new:true
            }
        );
        if(!updatedEmployee){
            next(new ApiError(404, "Employee not found"))
        }
        res.redirect("/web/employees")
    } catch (error) {
        next(new ApiError(500, "Server Error"))
    }
}