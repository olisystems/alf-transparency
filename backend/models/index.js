const mongoose = require('mongoose')
const dbConfig = require('../config/db.config')
const db = {}

db.mongoose = mongoose;
db.url = dbConfig.url;
db.offers = require('./offer.model.js')

module.exports = db;