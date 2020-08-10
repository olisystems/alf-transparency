// this module will be used to define a constructor
// for Offer

// the module use the database connection to write CRUD functions
// 1. create a new offer
// 2. retrieve the offer by ID i.e date
const mongoose = require('mongoose')

var schema = new mongoose.Schema({ username: 'string', date: 'string', offer: 'string' });
var Offer = mongoose.model('Offer', schema);

module.exports = Offer;