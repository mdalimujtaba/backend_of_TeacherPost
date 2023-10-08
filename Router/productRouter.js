const express = require('express')
const { productModel } = require('../Models/productModels')
const productRoute = express.Router()
const multer = require('multer')
const { authentication } = require('../Authentications/Authentication')
const { studentDetailAuthentication } = require('../Authentications/AuthenticationForStudentDetail')



productRoute.get('/admin_get', async (req, res) => {
    try {
        const details = await productModel.find()
        console.log(details)
        res.send({ 'msg': 'successfully', "details": details })
    } catch (error) {
        console.log(error)
        res.send({ 'msg': 'fails' })
    }
})

productRoute.get('/get_all_products', async (req, res) => {
    try {
        const details = await productModel.find()
        // console.log(details)
        res.send({ 'msg': 'successfully', "details": details })
    } catch (error) {
        console.log(error)
        res.send({ 'msg': 'fails' })
    }
})

productRoute.patch("/admin_update/:id", async (req, res) => {
    let payload = req.body
    let id = req.params.id
    try {
        await productModel.findByIdAndUpdate({ _id: id }, payload)
        res.send(`id no. ${id} is updated`)
    } catch (error) {
        console.log(error)
        res.send("Something went wrong")
    }
})

productRoute.delete("/delete/:id", async (req, res) => {
    let id = req.params.id
    try {
        await productModel.findByIdAndDelete({ _id: id })
        res.send(`id number ${id} is deleted`)
    } catch (error) {
        console.log(error)
        res.send("Something went wrong")
    }
})
productRoute.use(studentDetailAuthentication)
productRoute.get("/get_tutor_details/:id", async (req, res) => {
    let id = req.params.id
    // console.log('id:', id)
    try {
              let tutor_details = await productModel.findById({ _id: id })
        // console.log(tutor_details)
        res.send({ "message": "Successfully got data.", "tutor_details": tutor_details })

    } catch (error) {
        console.log(error)

        res.send("Something went wrong.")
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


const upload = multer({ storage })
productRoute.use(authentication)

productRoute.post('/upload', upload.fields([{ name: 'file' }, { name: 'video' }]), async (req, res) => {
    const { userID, firstname, lastname, gender, description, specialist, specialist_class, language, classes, mode, experience, location, address, fees } = req.body
    const { file, video } = req.files
    try {
        const details = new productModel({ userID, firstname, lastname, image: file[0].filename, video: video[0].filename, gender, description, specialist, specialist_class, language, classes, mode, experience, location, address, fees })
        await details.save()
        console.log(details)
        res.send({ 'msg': 'Details added successfully' })
    } catch (error) {
        console.log(error)
        res.send({ 'msg': 'addition fails' })
    }

    // console.log(req.body)
    console.log(file[0].filename)
    console.log(video[0].filename)

})
productRoute.get('/account', async (req, res) => {
    const { userID } = req.body
    try {
        const details = await productModel.find({ userID })
        console.log(details)
        res.status(200).json({ "message": "Successfull" }, { "data": details })
    } catch (error) {
        console.log(error)
        res.status(400).json({ "message": "failed" })

    }
})
productRoute.patch("/update", async (req, res) => {
    let payload = req.body
    let { userID } = req.body
    try {
        const data = await productModel.find({ userID })
        let id = data[0]._id
        let detail = await productModel.findByIdAndUpdate({ _id: id }, payload)
        console.log(detail)
        res.send(`id no. ${userID} is updated`)
    } catch (error) {
        console.log(error)
        res.send("Something went wrong")
    }
})



module.exports = { productRoute }

