const express = require('express')
const router = express.Router()
const axios = require('axios')
const Airport = require('../models/Airport')
const Flight = require('../models/Flight')

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
    let d = R * c;
    return d;
}

router.post('/add-flight', function(req, res, next) {
    Airport.find()
        .exec((err, list) => {
            const airports = {}
            list.forEach(item => {
                    airports[item.key] = item
                })
                // for (let key in airports) {
                //     const current = airports[key]
                //     res.send({
                //         [key]: airports[key]
                //     })
                //     return
                // }
            const flightList = list.reduce(function(flights, item) {
                let { routes, key, countryCode, lat, long } = item
                routes = routes.split('|')
                if (routes.length > 0) {
                    routes.forEach(code => {
                        const d = distanceBetween2Points(
                            airports[key].lat, airports[key].long,
                            airports[code].lat, airports[code].long,
                        )
                        const newFlight = new Flight({
                            flight_number: key + code + d,
                            planes_code: getPlanesCode(),
                            airport_go: key,
                            airport_to: code,
                            datetime: Math.floor(Date.now() / 1000),
                            customer: [],
                            price_economy: 0,
                            price_bussiness: 0,
                        })
                        newFlight.save()
                    })
                }
                return flights
            }, [])
            res.send({ count: flightList.length, flightList })
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
                    data: flights
                })
            }
        })
})

router.get('/add-airport', function(req, res, next) {
    const urlGetAirport = 'https://www.jetstar.com/vi-VN/apiservices/flightschedulev2/getflightschedules'
    axios(urlGetAirport)
        .then(({ data }) => {
            let airports = []
            if (data) {
                data.forEach(country => {
                    country.Airports.forEach(item => {
                        let { AdditionalCurrency, ScheduledDates, ...infoAirport } = item
                        let info = {
                            key: infoAirport.Key,
                            name: infoAirport.Name,
                            lat: +infoAirport.Lat || 0,
                            long: +infoAirport.Long || 0,
                            routes: infoAirport.Routes || '',
                        }
                        const airport = {
                            ...info,
                            countryCode: country.CountryCode,
                            countryName: country.Country,
                            currencyCode: country.DefaultCurrencyCode,
                        }

                        airports = [...airports, airport]
                    })
                })

                airports.forEach(airport => {
                    new Airport(airport).save()
                })
            }
            res.send({ status: 'ok', count: airports.length, airports })
        })
        .catch(err => res.send({ status: 'failed', error: err.message }))
})

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

module.exports = router