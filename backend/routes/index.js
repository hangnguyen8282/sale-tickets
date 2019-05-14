const express = require('express')
const router = express.Router()
const axios = require('axios')
const Airport = require('../models/Airport')
const Flight = require('../models/Flight')
const Customer = require('../models/Customer')

/* GET home page. */
function getPlanesCode() {
    const planes = [
        'Airbus A300',
        'Airbus A310',
        'Airbus A310 MRTT',
        'Airbus A320',
        'Airbus A320neo',
        'Airbus A330',
        'Airbus A330neo',
        'Airbus A340',
        'Airbus A380',
        'Boeing B787',
        'Boeing B788',
        'Boeing B789',
    ];
    return planes[Math.floor(Math.random() * 12)]
}

function getFlightNumber(prefix) {
    return prefix + Math.floor(Math.random() * 10000)
}

function distanceBetween2Points(la1, lo1, la2, lo2) {
    let dLat = (la2 - la1) * (Math.PI / 180);
    let dLon = (lo2 - lo1) * (Math.PI / 180);
    let la1ToRad = la1 * (Math.PI / 180);
    let la2ToRad = la2 * (Math.PI / 180);
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(la1ToRad) *
        Math.cos(la2ToRad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = 6371 * c;
    return d;
}
router.get('/get-airports', function(req, res, next) {
    Airport.find({})
        .exec((err, airports) => {
            if (err) {
                res.send({
                    status: 'failed',
                    data: [],
                    message: err.message
                })
            } else {
                res.send({
                    status: 'ok',
                    data: airports
                })
            }
        })
})

router.get('/search-flight', function(req, res, next) {
    Flight.find({
            airport_go: req.query.airport_go,
            airport_to: req.query.airport_to
        })
        .exec((err, flights) => {
            if (err) {
                res.send({
                    status: 'failed',
                    data: [],
                    message: err.message
                })
            } else {
                res.send({
                    status: 'ok',
                    list: flights
                })
            }
        })
})

router.get('/get-flights', function(req, res, next) {
    Flight.find({})
        .exec((err, flights) => {
            if (err) {
                res.send({
                    status: 'failed',
                    data: [],
                    message: err.message
                })
            } else {
                res.send({
                    status: 'ok',
                    count: flights.length,
                    data: flights
                })
            }
        })
})

router.post('/add-flight', function(req, res, next) {
    const body = req.body
    const flight = new Flight({
        flight_number: body.flightNumber,
        planes_code: body.planeCode,
        airport_go: body.airportGo,
        airport_to: body.airportTo,
        datetime: new Date(body.date).getTime() / 1000,
        customer: body.customer ? body.customer : [],
        price_economy: body.priceEconomic,
        price_bussiness: body.priceBussiness,
    })
    flight.save()
    res.send(flight)
})

router.get('/all-user', function(req, res, next) {
    Customer.find({}, (err, list) => {
        res.send(list)
    })
})

router.post('/book-ticket', function(req, res, next) {
    const info = req.body.info
    const _id = req.body._id
    const char = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
    const char2 = ['B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q', 'K', 'L', 'Z', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const n1 = char.length
    const n2 = char.length

    let key = char[Math.floor(Math.random() * n1 + 1)]
    for (let i = 0; i < 6; i++) {
        key += char2[Math.floor(Math.random() * n2 + 1)]
    }
    const customer = new Customer({
        key: key,
        ...info
    })
    customer.save()
    Flight.findByIdAndUpdate({ _id }, {
        $push: { customer: key }
    }, (err, flight) => {
        console.log(flight)
    })
    res.send({ customer })
})

router.get('/find-ticket', function(req, res, next) {
    const key = req.query.key
    const email = req.query.email
    Customer.findOne({ key, email },
        (err, customer) => {
            if (err) console.log(err)
            res.send(customer)
        })
})

router.get('/delete-flight', function(req, res, next) {
    const _id = req.query._id
    Flight.findByIdAndDelete({ _id },
        (err, flight) => {
            if (err) console.log(err + '')
            res.send(flight)
        })
})

// router.post('/add-airport', function(req, res, next) {
//     const urlGetAirport = 'https://www.jetstar.com/vi-VN/apiservices/flightschedulev2/getflightschedules'
//     axios(urlGetAirport)
//         .then(({ data }) => {
//             let airports = []
//             if (data) {
//                 data.forEach(country => {
//                     country.Airports.forEach(item => {
//                         let { AdditionalCurrency, ScheduledDates, ...infoAirport } = item
//                         let info = {
//                             key: infoAirport.Key,
//                             name: infoAirport.Name,
//                             lat: +infoAirport.Lat || 0,
//                             long: +infoAirport.Long || 0,
//                             routes: infoAirport.Routes || '',
//                         }
//                         const airport = {
//                             ...info,
//                             countryCode: country.CountryCode,
//                             countryName: country.Country,
//                             currencyCode: country.DefaultCurrencyCode,
//                         }

//                         airports = [...airports, airport]
//                     })
//                 })

//                 airports.forEach(airport => {
//                     new Airport(airport).save()
//                 })

//                 airports.forEach(airport => {
//                     new Airport(airport).save()
//                 })
//             }
//             res.send({ status: 'ok', count: airports.length, airports })
//         })
//         .catch(err => res.send({ status: 'failed', error: err.message }))
// })

// router.post('/add-flight-list', function(req, res, next) {
//     Airport.find()
//         .exec((err, list) => {
//             const airports = {}
//             list.forEach(item => {
//                 airports[item.key] = item
//             })
//             list.forEach(item => {
//                 let { routes, key, countryCode } = item
//                 routes = routes.split('|')
//                 if (routes.length > 12) {
//                     routes.forEach(code => {
//                         if (!airports[key] || !airports[code]) return
//                         const d = distanceBetween2Points(
//                             airports[key].lat, airports[key].long,
//                             airports[code].lat, airports[code].long,
//                         )
//                         const newFlight = new Flight({
//                             flight_number: getFlightNumber(countryCode),
//                             planes_code: getPlanesCode(),
//                             airport_go: key,
//                             airport_to: code,
//                             datetime: Math.floor(Date.now() / 1000 + 3600 * 24),
//                             customer: [],
//                             price_economy: Math.floor(d) * 1100,
//                             price_bussiness: Math.floor(d) * 1100 + 500000,
//                             distance: floor(d)
//                         })
//                         newFlight.save()
//                     })
//                 }
//             })
//             res.send({ status: 'ok' })
//         })
// })

module.exports = router