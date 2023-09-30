const mongoose=require('mongoose')
const TeacherOTPVerificationSchema=mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"teacher",
        required:true
    },
    otp:{type:Number,required:true},
    createdAt:{type:Date,required:true},
    expiredAt:{type:Date,required:true}
},{
    versionKey:false
})
const TeacherOTPVerificationModel=mongoose.model('TeacherOTPVerificationModel',TeacherOTPVerificationSchema)
module.exports={TeacherOTPVerificationModel}
