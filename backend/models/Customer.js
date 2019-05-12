const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Customer = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    gender: { type: Number, enum: ['male', 'female'], required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    history: { type: Array }
})
module.exports = mongoose.model('Customer', Customer)