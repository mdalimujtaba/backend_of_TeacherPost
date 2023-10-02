const express = require('express')
const cors = require('cors')
require('dotenv').config()
const cookie=require('cookie-parser')
const port = process.env.PORT
const { connected } = require('./configs/db')
const { userRoute } = require('./Router/userRouter')
const { productRoute } = require('./Router/productRouter')
const cookieParser = require('cookie-parser')
const { teacherRoute } = require('./Router/teacherRouter')

const app = express()

app.use(cors({credentials:true,origin:"http://localhost:5173"}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/all_teacher',productRoute)
app.use('/user', userRoute)
app.use('/teacher',teacherRoute)


app.listen(port, async () => {
    try {
        await connected
        console.log('connected to database')
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at http://localhost:${port}`)
})
