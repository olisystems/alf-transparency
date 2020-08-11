const mongoose = require('mongoose')

var schema = new mongoose.Schema({
  username: 'string',
  date: 'string',
  offer: 'string',
})
var Offer = mongoose.model('Offer', schema)

module.exports = Offer
