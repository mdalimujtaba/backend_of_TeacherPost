const mongoose = require("mongoose")
const AdminSchema = mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirm_password: { type: String, required: false }
}, {
    versionKey: false
})

const AdminModel = mongoose.model("admin", AdminSchema)
module.exports = {
    AdminModel
}