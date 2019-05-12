const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Airport = new Schema({
    key: { type: String, required: true },
    name: { type: String, required: true },
    lat: { type: Number, required: true },
    long: { type: Number, required: true },
    routes: { type: String, default: '' },
    currencyCode: { type: String },
    countryCode: { type: String, required: true },
    countryName: { type: String, required: true },
})

module.exports = mongoose.model('Airport', Airport)