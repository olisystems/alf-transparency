// this module defines how the server should respond
// when a request is made for an endpoint (GET, POST)
// this module will use a controller for handling the CRUD operations

// two routes will be:
// 1. /offers
// 2. /offers/:offerDate

module.exports = (app) => {
    const offers = require('../controllers/offer.controller.js')
    const router = require('express').Router()

    router.post('/', offers.create)
    router.get('/all', offers.findAll)
    router.get('/byUsername', offers.findByUsername)
    router.get('/byUsernameDate', offers.findByUsernameDate)

    app.use('/api/offers', router)
}