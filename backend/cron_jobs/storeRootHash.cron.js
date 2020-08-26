const db = require('../models')
const ALFTransparency = require('../controllers/ALFTransparency.controller')
const Offer = db.offers
const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')

module.exports = function() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  Offer.find({
    date: tomorrow,
  })
  .then((data) => {
    if(!data.length) {
      console.log("LOG: no offers for tomorrow.");
      return;
    }

    // Extract offers from data and create leaves
    const leaves = data.map((x) => {
      return x.hash;
    })
    const tree = new MerkleTree(leaves, SHA256)
    const rootHash = tree.getHexRoot()

    ALFTransparency.storeRootHash(rootHash, "ALF_Demo", tomorrow)
    .then((response) => {
      console.log(`LOG: Hash stored for ${tomorrow}`)
    })
  })
  .catch((err) => {
    console.log(err);
  })
}