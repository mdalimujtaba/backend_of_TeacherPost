const mongoose=require('mongoose')
require("dotenv").config()

const url=process.env.URL
const connected=mongoose.connect(url)
module.exports={connected}