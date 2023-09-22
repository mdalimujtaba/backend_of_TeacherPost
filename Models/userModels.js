const mongoose=require("mongoose")
const userSchema=mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    cpassword:{type:String,required:false},
    mobile:{type:Number,required:true},
    pincode:{type:Number,required:true}
},{
    versionKey:false
})

const UserModel=mongoose.model("userSignup",userSchema)
module.exports={
    UserModel
}