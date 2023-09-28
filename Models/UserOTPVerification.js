const mongoose=require('mongoose')
const UserOTPVerificationSchema=mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"student",
        required:true
    },
    otp:{type:Number,required:true},
    createdAt:{type:Date,required:true},
    expiredAt:{type:Date,required:true}
},{
    versionKey:false
})
const UserOTPVerificationModel=mongoose.model('UserOTPVerificationModel',UserOTPVerificationSchema)
module.exports={UserOTPVerificationModel}
