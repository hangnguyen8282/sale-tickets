const express = require('express');
const router = express.Router();
const axios = require('axios')
const Airport = require('../models/Airport')

/* GET home page. */
router.get('/add-airport', function (req, res, next) {
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
});

router.get('/get-airports', function (req, res, next) {
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
});

module.exports = router;
