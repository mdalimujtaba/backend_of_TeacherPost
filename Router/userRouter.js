const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const { UserModel } = require("../Models/userModels")
const userRoute = express.Router()


userRoute.post('/register', async (req, res) => {
    const { firstname, lastname, email, password, cpassword, mobile, pincode } = req.body
    try {
        bcrypt.hash(password, 5, async (err, safe) => {
            if (err) {
                res.send({ 'msg': 'Something went wrong' })
            }
            else {
                let signup = new UserModel({ firstname, lastname, email, password: safe, mobile, pincode })
                await signup.save()
                console.log(signup)
                res.send({ 'msg': 'Signup Successfull' })
            }
        })
    } catch (error) {
        console.log(error)
        res.send({ 'msg': 'Something went wrong' })
    }
})

userRoute.post('/login', async (req, res) => {
    const { email, password } = req.body
    try {
        const data = await UserModel.find({ email })
        if (data.length > 0 && data[0].email === email) {
            bcrypt.compare(password, data[0].password, async (err, result) => {
                if (result) {
                    const token = jwt.sign({ "userID": data[0]._id, "name": data[0].firstname }, "teacher")
                    res.send({ "msg": "Login Successfull", "token": token, "firstname": data[0].firstname })
                } else {
                    res.send({ 'msg': "Wrong Credential" })
                }
            })
        }
        else {
            res.send({ 'msg': "Wrong Credential" })
        }
    } catch (error) {
        res.send({ "msg": "Wrong Credential" })
        console.log(error)
    }
})



module.exports = { userRoute }