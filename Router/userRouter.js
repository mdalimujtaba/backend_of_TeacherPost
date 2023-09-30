const express = require("express")
require('dotenv').config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../Models/userModels")
const userRoute = express.Router()
const nodemailer=require('nodemailer')
const { UserOTPVerificationModel } = require("../Models/UserOTPVerification")
const {authentication}=require('../Authentications/Authentication')


const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

userRoute.post('/register', async (req, res) => {
    const { firstname, lastname, email, password, confirm_password, mobile, pincode,verified } = req.body
    const data=await UserModel.find({email})
    
    if(data.length>0 && data[0].email===email){
        res.send({ 'msg': 'Email exist! Please Login!' })
    }else{
        try {
            bcrypt.hash(password, 5, async (err, safe) => {
                if (err) {
                    res.send({ 'msg': 'Something went wrong' })
                }
                else {
                    let signup = new UserModel({ firstname, lastname, email, password: safe, mobile, pincode,verified:false })
                    await signup.save()
                    // .then((result)=>{
                    //     sendOTPVerificationEmail(result,res)
                     
                    // })
                    res.send({ 'msg': 'Signup Successfull' })
                }
            })
        } catch (error) {
            console.log(error)
            res.send({ 'msg': 'Something went wrong' })
        }
    }
})

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const data = await UserModel.find({ email })
        if (data.length > 0 && data[0].email === email) {
            bcrypt.compare(password, data[0].password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ "userID": data[0]._id }, "teacher",{expiresIn:'1h'})
                    res.cookie(String(data[0]._id),token,{
                        path:'/user',
                        expires:new Date(Date.now()+3600000),
                        httpOnly:true,
                        sameSite:'lax'
                    })
                    res.send({ "msg": "Login Successfull", "token": token, "firstname": data[0].firstname ,
                    "type": "student", "_id": data[0]._id})
                } else {
                    res.send({ 'msg': "Wrong Credential" })
                }
            })

        }
        else {
            res.send({ 'msg': "Wrong Credential" })
        }
    } catch (error) {
        res.send({ "msg": "Wrong Credential" })
        console.log(error)
    }
    
})


const sendOTPVerificationEmail=async({_id,email},res)=>{
    try {
        const otp=`${Math.floor(1000 + Math.random()*9000)}`
        const contentOfEmail={
            from:process.env.EMAIL,
            to:email,
            subject:'verify your email',
            html:`<p>Enter <b>${otp} to verify your email address and complete your registration.</b></p>
            <p>This code verify in 1 hour.</p>`
        }
        const otpVerification=new UserOTPVerificationModel({
            userID:_id,
            otp:otp,
            createdAt:Date.now(),
            expiredAt:Date.now()+ 3600000
        })
        await otpVerification.save()
        await transporter.sendMail(contentOfEmail)
        res.json({
            status:'Pending',
            message:'Verification otp email send',
            data:{
                userID:_id,
                email
            }
        })
    } catch (error) {
        console.log(error)
        res.send({'msg':'error occurred'})
    }
}
userRoute.use(authentication)
userRoute.get('/userGet',async(req,res)=>{
    const {userID}=req.body
    let user=await UserModel.findById(userID)
    try {
        if(!user){
            res.send({'message':'User not found'})
        }
        else{
            res.send({user})
        }
    } catch (error) {
        console.log(error)
    }
})
userRoute.post("/verifyOTP",async(req,res)=>{
    const {userID,otp}=req.body
    let userOtpRecord=await UserOTPVerificationModel.find({userID}).populate(['userID'])
    const {expiredAt,_id}=userOtpRecord[0]
    console.log(otp,userOtpRecord[0].otp)
    try {
        if(userOtpRecord.length<=0){
            res.send({'msg':"Resend OTP"})
        }
        else{
           if(expiredAt < Date.now()){
            await UserOTPVerificationModel.deleteMany(_id)
            res.send({'msg':'OTP expired'})
           }
           else{
            if(otp===userOtpRecord[0].otp){
                await UserModel.updateOne({_id:userID},{verified:true})
                await UserOTPVerificationModel.deleteMany(_id)
                res.send({
                    status:'verified',
                    message:"User email verified successfully"
                })
            }
            else{
                res.send({'msg':'Enter correct otp'})
            }
           }
        }
    } catch (error) {
        console.log(error)
        res.json({
            status:'Failed'
        })
    }

})

userRoute.post('/resentOtp',async(req,res)=>{
try {
    const {userID,email}=req.body
    console.log(userID,email)
    await UserOTPVerificationModel.deleteMany({userID})
    sendOTPVerificationEmail({_id:userID,email},res)

} catch (error) {
    console.log(error)
    res.send({'msg':'Error in resending otp'})
}    

})
module.exports = { userRoute }