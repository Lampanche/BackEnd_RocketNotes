require("express-async-errors")

const migrationsRun = require("./database/sqlite/migrations")

const express = require('express')

const uploadsConfig = require("./configs/upload")

const AppError = require("./utils/AppError")

const routes = require("./routes")

const cors = require("cors")

const app = express()

app.use(cors())

app.use(express.json())

app.use("/files", express.static(uploadsConfig.UPLOADS_FOLDER))

app.use(routes)

app.use((error, request, response, next) => {
    
    if(error instanceof AppError)
    {
        return response.status(error.statusCode).json({
            
            status: "error",
            message: error.message
        })
    }
    
    // console.log(error(error))
    
    response.status(500).json({
        
        status: "error",
        message: "Internal server error"
        
    })
})

migrationsRun()

const port = 3333

app.listen(port, () => console.log(`Server is runing on PORT: ${port}`))


