module.exports = (app) => {
  const offers = require('../controllers/offer.controller.js')
  const router = require('express').Router()

  // Create new Offer route
  // @params: Raw JSON { username: 'string', date: 'string', offer: 'string' }
  router.post('/', offers.create)

  // --- Demonstration routes --
  // Retrieve all Offers route
  router.get('/all', offers.findAll)
  // Find Offer by username
  router.get('/byUsername', offers.findByUsername)
  // Find Offer by username and date
  router.get('/byUsernameDate', offers.findByUsernameDate)

  // --- Proof of Concept routes --
  // @params: GET query ?username=XYZ&date=XYZ
  router.get('/hash', offers.getHash)
  router.get('/proof', offers.getProof)

  app.use('/api/offers', router)
}
