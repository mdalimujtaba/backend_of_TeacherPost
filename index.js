const express = require('express')
const cors = require('cors')
const fs=require('fs')
require('dotenv').config()
const cookie=require('cookie-parser')
const port = process.env.PORT
const { connected } = require('./configs/db')
const { userRoute } = require('./Router/userRouter')
const { productRoute } = require('./Router/productRouter')
const cookieParser = require('cookie-parser')
const { teacherRoute } = require('./Router/teacherRouter')
const { student_detail_route, studentDetailRoute } = require('./Router/studentDetailRouter')

const app = express()

app.use(cors({credentials:true,origin:"http://localhost:8080"}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/all_teacher',productRoute)
app.use('/user', userRoute)
app.use('/student_detail',studentDetailRoute)
app.use('/teacher',teacherRoute)




app.get('/api',async(req,res)=>{
    try {
        if(req.url==='/favicon.ico'){
            res.end()
        }
        // console.log(req.query)
        const json=fs.readFileSync('count.json','utf-8')
        
        const obj=JSON.parse(json)
        if(req.query.type==='visit-pageview'){
            obj.visits=obj.visits+1
        }else{
            obj.pageviews=obj.pageviews+1

        }
        const newJSON=JSON.stringify(obj)
        fs.writeFileSync('count.json',newJSON)
        res.status(200).json({'pageviews':obj.pageviews,'visits':obj.visits})
    } catch (error) {
        res.status(400).send({'message':'Something wrong'})
    }
})


app.listen(port, async () => {
    try {
        await connected
        console.log('connected to database')
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at http://localhost:${port}`)
})
