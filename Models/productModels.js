const mongoose=require('mongoose')
const productSchema=mongoose.Schema({
    name:{type:String,required:true},
    class:{type:String,required:true},
    subject:{type:String,required:true},
    specialist:{type:String,required:false},
    medium:{type:String,required:true},
    mode:{type:String,required:true},
    experience:{type:String,required:true},
    fee:{type:String,required:true},
    description:{type:String,required:true}
},{
    versionKey:false
})

const productModel=mongoose.model('product',productSchema)
module.exports={productModel}