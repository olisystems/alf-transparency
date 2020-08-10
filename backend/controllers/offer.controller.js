const db = require('../models')
const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
const Base64 = require('crypto-js/enc-base64')
const Offer = db.offers


exports.create = (req, res) => {
    const offer = new Offer({
        username: req.body.username,
        date: req.body.date,
        offer: req.body.offer
    });

    offer.save(offer).then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.log('Error saving offer!', err)
      });
};


exports.findAll = (req, res) => {
    Offer.find( {} ).then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.log('Error finding offers!', err)
      });
};

exports.findByUsername = (req, res) => {
    Offer.find({ username: req.query.username } ).then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.log('Error finding offers!', err)
        res.send("ERROR: No offer with given username found.")
      });
};

exports.findByUsernameDate = (req, res) => {
    Offer.find({
        username: req.query.username,
        date: req.query.date
    }).then((data) => {
        res.send(data)
    })
    .catch((err) => {
        console.log('Error finding offers!', err)
        res.send("ERROR: No offer with given username & date found.")
    });
};

// --- Proof of Concept controller functions ---
exports.getHash = (req, res) => {
    // ERROR handling required for 
    Offer.find({
        username: req.query.username,
        date: req.query.date
    }).then((data) => {
        // Calculate hash here
        // IMPORTANT: Use same encoder on client & server side
        res.send(SHA256(data.offer).toString(Base64))
    })
    .catch((err) => {
        console.log('ERROR: No offer with given username & date found.', err)
        res.send("ERROR: No offer with given username & date found.")
    });
};

exports.getProof = (req, res) => {
    Offer.find({
        date: req.query.date
    }).then((data) => {
        // Find offer with specified username
        let offer = data.find((data) => {
            return data.username == req.query.username
        }).offer
        // Create leaf hash from offer
        let leaf = SHA256(offer)

        // Extract offers from data and create leaves
        let leaves = data.map(x => SHA256(x.offer))
        let tree = new MerkleTree(leaves, SHA256)

        // Get proof 
        // Return empty array for single element tree!
        let proof = tree.getProof(leaf)
        res.send(proof)
    })
    .catch((err) => {
        console.log('Error finding offers!', err)
        res.send("ERROR: No offer with given username & date found.")
    });
};
