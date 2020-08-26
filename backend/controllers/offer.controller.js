const db = require('../models')
const ALFTransparency = require('./ALFTransparency.controller')
const Offer = db.offers
const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
const Base64 = require('crypto-js/enc-base64')


// create and save a new Offer
exports.create = (req, res) => {
  const offer = new Offer({
    username: req.body.username,
    date: req.body.date,
    hash: req.body.hash,
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

  Offer.find({ username: username })
    .then((data) => {
      if (data.length === 0)
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
      if (data.length === 0)
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

// Proof of Concept controller functions
exports.getHash = (req, res) => {
  const username = req.query.username
  const date = req.query.date
  // Find first offer with given username & date
  Offer.findOne({
    username: username,
    date: date,
  })
    .then((data) => {
      // Return hash
      if (!data)
        res.status(404).send({
          message: `Hash not found with username: ${username} and date: ${date}`,
        })
      else res.send(data.hash)
    })
    .catch((err) => {
      res.status(500).send({
        message: `Hash not found with username: ${username} and date: ${date}`,
      })
    })
}

exports.getProof = (req, res) => {
  const username = req.query.username
  const date = req.query.date

  Offer.find({
    date: date,
  })
    .then((data) => {
      // Find offer with specified username
      const leaf = data.find((data) => {
        return data.username == username;
      }).hash

      // Extract offers from data and create leaves
      const leaves = data.map((x) => {
        return x.hash;
      })

      // Create tree
      const tree = new MerkleTree(leaves, SHA256)
      const root = tree.getRoot().toString('hex')

      // Get proof
      // Return empty array for single leaf tree & for bad leaf!
      const proof = tree.getProof(leaf)
      res.send({ pf: proof, r: root})
    })
    .catch((err) => {
      res.send({
        message: `No hash found with username: ${username} and date: ${date}`,
      })
    })
}

exports.storeRootHash = (req, res) => {
  const date = req.query.date

  Offer.find({
    date: date,
  })
  .then((data) => {
    if(!data.length) {
      res.status(500).send({
        message: `Offers not found for date: ${date}.`,
      })
      return;
    }

    // Extract offers from data and create leaves
    const leaves = data.map((x) => {
      return x.hash;
    })
    const tree = new MerkleTree(leaves, SHA256)
    const rootHash = tree.getHexRoot()

    ALFTransparency.storeRootHash(rootHash, "ALF_Demo", date)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: `Root Hash for date ${date} could not be stored on-chain.`,
        err: err.message
      })
    })
  })
  .catch((err) => {
    res.status(500).send({
      message: `Offers not found for date: ${date}`,
    })
  })
}