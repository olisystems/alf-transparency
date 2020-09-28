const https = require('https');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const fs = require('mz/fs')
// const cron = require("node-cron");

const app = express()

// Set CORS options
const corsOptions = {
  // allow one domain
  // origin: 'http://localhost:8080',
  origin: '*',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

// Parse requests of content-type - application/json
app.use(bodyParser.json())
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Initiate routes
require('./routes/offer.routes')(app)

const options = {
  cert: fs.readFileSync('/etc/ssl/fullchain.pem'),
  key: fs.readFileSync('/etc/ssl/privkey.pem')
};

// Set port, listen for requests
const PORT = process.env.PORT || 3000

// create HTTP server
//app.listen(PORT, () => {
//  console.log(`Server is running on port ${PORT}.`)
//})

// create HTTPS server
https.createServer(options, app).listen(PORT, () => {
  console.log(`HTTPS server is running on port ${PORT}.`)
});

// Mongoose connect method
const db = require('./models')
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    //    ssl: true,
    //    rejectUnauthorized:false
  })
  .then(() => {
    console.log(`Connected to the MongoDB at ${db.url}.`)
  })
  .catch((err) => {
    console.log('Cannot connect to the MongoDB!', err)
    process.exit()
  })

// const cronStoreRootHash = require('./cron_jobs/storeRootHash.cron')
// cron.schedule("00 17 * * *", cronStoreRootHash)
