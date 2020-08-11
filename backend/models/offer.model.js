const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define Offer schema
const OfferSchema = new Schema({
  username: String,
  date: String,
  hash: String,
})

// Create model
const Offer = mongoose.model('User', OfferSchema)
module.exports = Offer
