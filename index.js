const express=require('express')
const cors=require('cors')
require('dotenv').config()
const port=process.env.PORT
const { connected } = require('./configs/db')
const { userRoute } = require('./Router/userRouter')

const app=express()

app.use(cors({origin:'*'}))

app.use(express.json())

app.use('/user',userRoute)


app.listen(port,async()=>{
try {
    await connected
    console.log('connected to database')
} catch (error) {
    console.log(error)
}
console.log(`server is running at http://localhost:${port}`)
})
