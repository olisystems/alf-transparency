const db = require("../models");
const Offer = db.offers;
const { MerkleTree } = require("merkletreejs");
const SHA256 = require("crypto-js/sha256");
const Base64 = require("crypto-js/enc-base64");
const Contract = require("../service/blockchain");

// create and save a new Offer
exports.create = (req, res) => {
  const offer = new Offer({
    username: req.body.username,
    date: req.body.date,
    hash: req.body.hash,
  });

  // save offer to the db
  offer
    .save(offer)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Offer.",
      });
    });
};

// Retrieve all Offers from the database.
exports.findAll = (err, res) => {
  Offer.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving offers.",
      });
    });
};

// Find Offer by username
exports.findByUsername = (req, res) => {
  const username = req.query.username;

  Offer.find({ username: username })
    .then((data) => {
      if (data.length === 0)
        res.status(404).send({
          message: `Offer not found with username: ${username}`,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Offer not found with username: ${username}`,
      });
    });
};

// Find Offer by username and date
exports.findByUsernameDate = (req, res) => {
  const username = req.query.username;
  const date = req.query.date;

  Offer.find({
    username: username,
    date: date,
  })
    .then((data) => {
      if (data.length === 0)
        res.status(404).send({
          message: `Offer not found with username: ${username} and date: ${date}`,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Offer not found with username: ${username} and date: ${date}`,
      });
    });
};

// Proof of Concept controller functions
exports.getHash = (req, res) => {
  const username = req.query.username;
  const date = req.query.date;
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
        });
      else res.send(data.hash);
    })
    .catch((err) => {
      res.status(500).send({
        message: `Hash not found with username: ${username} and date: ${date}`,
      });
    });
};

exports.getProof = (req, res) => {
  const username = req.query.username;
  const date = req.query.date;

  Offer.find({
    date: date,
  })
    .then((data) => {
      // Find offer with specified username
      const leaf = data.find((data) => {
        return data.username == username;
      }).hash;

      // Extract offers from data and create leaves
      const leaves = data.map((leaf) => {
        return leaf.hash;
      });

      // Create tree
      const tree = new MerkleTree(leaves, SHA256);

      // Get proof
      // Return empty array for single leaf tree & for bad leaf!
      const proof = tree.getProof(leaf);
      res.send(proof);
    })
    .catch((err) => {
      res.send({
        message: `No hash found with username: ${username} and date: ${date}`,
      });
    });
};

exports.storeRootHash = (req, res) => {
  const query = req.query.date;
  Offer.find({
    date: query,
  })
    .then((data) => {
      if (!data.length) {
        res.send({
          message: `Offers not found for date: ${query}.`,
        });
        return;
      }

      // Extract offers from data and create leaves
      const leaves = data.map((leaf) => {
        return leaf.hash;
      });
      const tree = new MerkleTree(leaves, SHA256);
      const rootHash = tree.getHexRoot();
      const address = "0x3D481ee06aFe587dAe5EAFA541c75c3D1F9dCdBc";

      Contract.methods
        .sendHash(rootHash, "ALF_Demo", query)
        .send({ from: address, gas: 3000000 })
        .then((response) => {
          res.send(response);
        })
        .catch((err) => {
          res.send({
            message: `Root Hash for date ${query} is already stored on-chain.`,
            err: err.message,
          });
        });
    })
    .catch((err) => {
      res.send({
        message: `Error in storing offer for date: ${date}`,
      });
    });
};
