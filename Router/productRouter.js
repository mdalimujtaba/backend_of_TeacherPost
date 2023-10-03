const express=require('express')
const { productModel } = require('../Models/productModels')
const productRoute=express.Router()
const multer=require('multer')
const { authentication } = require('../Authentications/Authentication')



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
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, './Media/uploads')
    },
    filename: function (req, file, cb) {
     return cb(null, file.originalname)
    }
  })
  const upload=multer({storage})
  productRoute.use(authentication)
productRoute.post('/upload',upload.fields([{name:'file'},{name:'video'}]),async(req,res)=>{
    const {userID,firstname,lastname,gender,description,specialist,specialist_class,language,classes,mode,experience,location,address,fees}=req.body
    const {file,video}=req.files
    try {
        const details=new productModel({userID,firstname,lastname,image:file[0].filename,video:video[0].filename,gender,description,specialist,specialist_class,language,classes,mode,experience,location,address,fees})
    await details.save()
    console.log(details)
    res.send({'msg':'Details added successfully'})
    } catch (error) {
        console.log(error)
        res.send({'msg':'addition fails'})
    }

    // console.log(req.body)
    console.log(file[0].filename)
    console.log(video[0].filename)

})
productRoute.get('/account',async(req,res)=>{
    const {userID}=req.body
    try {
        const details=await productModel.find({userID})
        console.log(details)
        res.status(200).json({"message":"Successfull"},{"data":details})
    } catch (error) {
        console.log(error)
        res.status(400).json({"message":"failed"})

    }
})


module.exports={productRoute}

