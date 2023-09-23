const express=require('express')
const { productModel } = require('../Models/productModels')
const productRoute=express.Router()


productRoute.get('/get',async(req,res)=>{
    try {
        const details=await productModel.find()
        console.log(details)
    res.send({'msg':'successfully'})
    } catch (error) {
        console.log(error)
        res.send({'msg':'fails'})
    }
})
productRoute.post('/create',async(req,res)=>{
    // const {name,clas, subject,specialist,medium,mode,experience,fee,description}=req.body
    
    try {
        const details=new productModel(req.body)
    await details.save()
    console.log(details)
    res.send({'msg':'Details added successfully'})
    } catch (error) {
        console.log(error)
        res.send({'msg':'addition fails'})
    }
})

module.exports={productRoute}

