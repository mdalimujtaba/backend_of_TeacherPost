const mongoose=require('mongoose')
const productSchema=mongoose.Schema({
    userID:{ type:mongoose.Schema.Types.ObjectId,
        ref:"teacher",
        required:true},
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    image:{type:String,required:true},
    video:{type:String,required:true},
    gender:{type:String,required:true},
    description:{type:String,required:true},
    specialist:{type:String,required:true},
    specialist_class:{type:String,required:true},
    language:{type:String,required:true},
    classes:{type:String,required:true},
    mode:{type:String,required:true},
    experience:{type:String,required:true},
    location:[{type:String,required:true}],
    address:{type:String,required:true},
    fees:{type:String,required:true}
},{
    versionKey:false
})

const productModel=mongoose.model('product',productSchema)
module.exports={productModel}