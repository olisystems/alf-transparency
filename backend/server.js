const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const db = require('./models')
const app = express()
const port = 3000

var corsOptions = {
  origin: 'http://localhost:8081',
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})

require('./routes/offer.routes.js')(app)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

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
