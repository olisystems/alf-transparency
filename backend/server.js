const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

// Set CORS options
const corsOptions = {
  origin: 'http://localhost:8081',
  optionsSuccessStatus: 200,
}
app.use(cors(corsOptions))

// Parse requests of content-type - application/json
app.use(bodyParser.json())
// Parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// Initiate routes
require('./routes/offer.routes')(app)

// Set port, listen for requests
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})

// Mongoose connect method
const db = require('./models')
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Connected to the MongoDB!')
  })
  .catch((err) => {
    console.log('Cannot connect to the MongoDB!', err)
    process.exit()
  })
