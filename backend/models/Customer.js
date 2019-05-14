const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Customer = new Schema({
    key: { type: String, required: true },
    mrTitle: { type: String, required: true },
    name: { type: String, required: true },
    birthDate: { type: String, required: true },
    sex: { type: String, enum: ["Nam", "Nữ"], required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    data: { type: String, required: true },
})
module.exports = mongoose.model('Customer', Customer)