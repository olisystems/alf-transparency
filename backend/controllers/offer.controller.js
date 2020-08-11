const db = require('../models')
const Offer = db.offers
const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
const Base64 = require('crypto-js/enc-base64')

// create and save a new Offer
exports.create = (req, res) => {
  const offer = new Offer({
    username: req.body.username,
    date: req.body.date,
    offer: req.body.offer,
  })

  // save offer to the db
  offer
    .save(offer)
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Offer.',
      })
    })
}

// Retrieve all Offers from the database.
exports.findAll = (err, res) => {
  Offer.find()
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving offers.',
      })
    })
}

// Find Offer by username
exports.findByUsername = (req, res) => {
  const username = req.query.username

  Offer.find(username)
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: `Offer not found with username: ${username}`,
        })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: `Offer not found with username: ${username}`,
      })
    })
}

// Find Offer by username and date
exports.findByUsernameDate = (req, res) => {
  const username = req.query.username
  const date = req.query.date

  Offer.find({
    username: username,
    date: date,
  })
    .then((data) => {
      if (!data)
        res.status(404).send({
          message: `Offer not found with username: ${username} and date: ${date}`,
        })
      else res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: `Offer not found with username: ${username} and date: ${date}`,
      })
    })
}

// --- Proof of Concept controller functions ---
exports.getHash = (req, res) => {
  // ERROR handling required for
  Offer.find({
    username: req.query.username,
    date: req.query.date,
  })
    .then((data) => {
      // Calculate hash here
      // IMPORTANT: Use same encoder on client & server side
      res.send(SHA256(data.offer).toString(Base64))
    })
    .catch((err) => {
      console.log('ERROR: No offer with given username & date found.', err)
      res.send('ERROR: No offer with given username & date found.')
    })
}

exports.getProof = (req, res) => {
  Offer.find({
    date: req.query.date,
  })
    .then((data) => {
      // Find offer with specified username
      let offer = data.find((data) => {
        return data.username == req.query.username
      }).offer
      // Create leaf hash from offer
      let leaf = SHA256(offer)

      // Extract offers from data and create leaves
      let leaves = data.map((x) => SHA256(x.offer))
      let tree = new MerkleTree(leaves, SHA256)

      // Get proof
      // Return empty array for single element tree!
      let proof = tree.getProof(leaf)
      res.send(proof)
    })
    .catch((err) => {
      console.log('Error finding offers!', err)
      res.send('ERROR: No offer with given username & date found.')
    })
}
