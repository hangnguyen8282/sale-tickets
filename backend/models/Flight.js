const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Flight = new Schema({
    flight_number: { type: String, required: true },
    planes_code: { type: String, required: true },
    airport_go: { type: String, required: true },
    airport_to: { type: String, required: true },
    datetime: { type: Number, required: true },
    customer: { type: Array, required: true },
    price_economy: { type: Number, required: true },
    price_bussiness: { type: Number, required: true }
})
module.exports = mongoose.model('Flight', Flight)