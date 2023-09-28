const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirm_password: { type: String, required: false },
    mobile: { type: Number, required: true },
    pincode: { type: Number, required: true },
    verified:{type:Boolean,required:true}
}, {
    versionKey: false
})

const UserModel = mongoose.model("student", userSchema)
module.exports = {
    UserModel
}