const express=require("express")
const studentDetailRoute=express.Router()
const { studentDetailModel } = require("../Models/studentDetailModel")
const { studentDetailAuthentication } = require("../Authentications/AuthenticationForStudentDetail")

studentDetailRoute.patch("/update/:id",async(req,res)=>{
    let payload=req.body
    let id=req.params.id
    try {
        await studentDetailModel.findByIdAndUpdate({_id:id},payload)
        res.send(`id no. ${id} is updated`)
    } catch (error) {
        console.log(error)
        res.send("Something went wrong")
    }
})

studentDetailRoute.delete("/delete/:id",async(req,res)=>{
    let id=req.params.id
    try {
        await studentDetailModel.findByIdAndDelete({_id:id})
        res.send(`id number ${id} is deleted`)
    } catch (error) {
        console.log(error)
        res.send("Something went wrong")
    }
})
studentDetailRoute.get("/get_student_detail",async(req,res)=>{
    
    try {
        const detail=await studentDetailModel.find()
        res.status(200).json({"message":"Successful"},{"data":detail})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({"message":"Something went wrong"})
    }
})

studentDetailRoute.use(studentDetailAuthentication)
studentDetailRoute.get("/get_student_detail",async(req,res)=>{
    const {userID}=req.body
    try {
        const detail=await studentDetailModel.find({userID}).populate(['userID'])
        res.status(200).json({"message":"Successful"},{"data":detail})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({"message":"Something went wrong"})
    }
})
studentDetailRoute.post("/create_student_detail",async(req,res)=>{
    
    const {userID}=req.body
    console.log(userID)
    try {
        const details=new studentDetailModel(req.body)
    await details.save()
    // console.log(details)
    res.send({'msg':'Details added successfully'})
    } catch (error) {
        console.log(error)
        res.send({'msg':'addition fails'})
    }
})
studentDetailRoute.patch("/update",async(req,res)=>{
    let payload=req.body
    let {userID}=req.body
    try {
        const data=await studentDetailModel.find({userID})
        let id=data[0]._id
       let detail= await studentDetailModel.findByIdAndUpdate({_id:id},payload)
    //    console.log(detail)
        res.send(`id no. ${userID} is updated`)
    } catch (error) {
        console.log(error)
        res.send("Something went wrong")
    }
})

module.exports={studentDetailRoute}