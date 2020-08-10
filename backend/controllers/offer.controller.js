const db = require('../models')
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
    });
};

// --- Proof of Concept controller functions ---
exports.getHash = (req, res) => {
    Offer.find({
        username: req.query.username,
        date: req.query.date
    }).then((data) => {
        // Calculate hash here
        res.send(data)
    })
    .catch((err) => {
        console.log('Error finding offers!', err)
    });
};

exports.getProof = (req, res) => {
    Offer.find({
        username: req.query.username,
        date: req.query.date
    }).then((data) => {
        // Calculate proof here
        res.send(data)
    })
    .catch((err) => {
        console.log('Error finding offers!', err)
    });
};
