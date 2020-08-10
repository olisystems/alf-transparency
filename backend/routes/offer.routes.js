// this module defines how the server should respond
// when a request is made for an endpoint (GET, POST)
// this module will use a controller for handling the CRUD operations

// two routes will be:
// 1. /offers
// 2. /offers/:offerDate

module.exports = (app) => {
    const offers = require('../controllers/offer.controller.js')
    const router = require('express').Router()

    // @params: Raw JSON { username: 'string', date: 'string', offer: 'string' }
    router.post('/', offers.create)

    // --- Demonstration routes --
    // @params: -
    router.get('/all', offers.findAll)
    router.get('/byUsername', offers.findByUsername)
    router.get('/byUsernameDate', offers.findByUsernameDate)

    // --- Proof of Concept routes --
    // @params: GET query ?username=XYZ&date=XYZ
    router.get('/hash', offers.getHash)
    router.get('/proof', offers.getProof)

    app.use('/api/offers', router)
}