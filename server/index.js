import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import connectDB from './config/db.js'
import userRouter from './route/user.route.js'

const app = express()

app.use(cors({
    credentials: true,
    origin : process.env.FRONTEND_URL
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))

const PORT = 8080 || process.env.PORT

app.get("/", (req, res) => {
    res.json({
        message : "Server is running"
    })
})

app.use('/api/user', userRouter)

connectDB()

app.listen(PORT,()=> {
    console.log(`Server is running on port ${PORT}`)
})
