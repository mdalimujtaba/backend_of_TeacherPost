
const mongoose=require('mongoose')
const studentDetailSchema=mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"student",
        required:true
    },
    student_name:{type:String,required:true},
    phone_no:{type:Number,required:true},
    school:{type:String,required:true},
    classes:{type:Number,required:true},
    percentage:{type:String,required:true},
    address:{type:String,required:true},
    pincode:{type:Number,required:true},
    city:{type:String,required:true},
    state:{type:String,required:true}
},{
    versionKey:false
})
const studentDetailModel=mongoose.model('studentDetail',studentDetailSchema)
module.exports={studentDetailModel}
