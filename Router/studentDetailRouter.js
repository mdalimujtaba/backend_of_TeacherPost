const express=require("express")
// const { authentication } = require("../Authentications/Authentication")
const { studentDetailModel } = require("../Models/studentDetailModel")
const { StudentAuthentication } = require("../Authentications/studentAuthentication")
const student_detail_route=express.Router()

student_detail_route.use(StudentAuthentication)
student_detail_route.post("/create",async(req,res)=>{
    const {userID}=req.body
    console.log(userID)
    try {
        const details=new studentDetailModel(req.body)
    await details.save()
    console.log(details)
    res.send({'msg':'Details added successfully'})
    } catch (error) {
        console.log(error)
        res.send({'msg':'addition fails'})
    }
})

module.exports={student_detail_route}