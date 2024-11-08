const winston = require("winston")

// logger functions
// creating log
const employeeLogger = winston.createLogger({
    transports: [
        new winston.transports.File(
            {
                filename: "employeeApi.log",
                level: "info",
                format: winston.format.combine(winston.format.timestamp(), winston.format.json())
            }
        ),
        new winston.transports.File(
            {
                filename: "employeeApiError.log",
                level: "error",
                format: winston.format.combine(winston.format.timestamp(), winston.format.json())
            }
        )


    ]
})

module.exports = employeeLogger