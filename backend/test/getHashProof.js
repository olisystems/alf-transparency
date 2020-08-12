// This test checks that hashes and proofs are provided correctly by the API.
// The following is done:
// 1. Create an array of randomized offers with same date
// 2. Create a Merkle Tree of randomized offers and store root hash locally.
// 3. Send randomized offers to API.
// 4. Check individual hashes retrieved from API.
// 5. Check individual proofs retrieved from API with local root hash.
const axios = require('axios')
const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
const HEX = require('crypto-js/enc-hex')
const baseurl = 'http://localhost:3000'

// --- Helpers ---
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

// --- 1. Create an array of randomized offers ---
// Function for creating random offer with specific date
function getRandomOffer(date) {
  // Create randomized username
  const randomUser = 'Alfred-' + getRandomInt(1000).toString();
  return {
    username: randomUser,
    date: date,
    hash: SHA256(randomUser + ' flex offer').toString(HEX)
  } 
}

const randomOffers = []
const randomDate = '2020-'+getRandomInt(12).toString()+'-'+getRandomInt(30).toString();
for(i = 0; i < 10; i++){
  randomOffers.push(getRandomOffer(randomDate));
}
// console.log(randomOffers)

// --- 2. Create a Merkle Tree of randomized offers and store root hash locally. ---
const localLeaves = randomOffers.map((x) => {
  return x.hash;
});
const localTree = new MerkleTree(localLeaves, SHA256);
const localRoot = localTree.getRoot().toString('hex')

// --- 3. Send randomized offers to API. ---
const createOffer = async function(offer){
  try {
    return await axios.post(baseurl+'/api/offers/', offer);
  } catch(error) {
    console.log(error);
  }
}

const sendAllOffers = async function(offers){
  for(i = 0; i < offers.length; i++){
    await createOffer(offers[i])
      .then((res) => {
        // console.log("Created offer:");
        // console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log("Created "+ offers.length + ' offers.');
}

// --- 4. Check individual hashes retrieved from API. ---
const getHash = async function(offer) {
  try {
    return await axios.get(baseurl+'/api/offers/hash', {
      params: {
        username: offer.username,
        date: offer.date
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const checkHashes = async function(offers){
  for(i = 0; i < offers.length; i++){
    await getHash(offers[i])
      .then((res) => {
        // Compare retrieved hash
        if(res.data !== offers[i].hash){
          console.log("ERROR: Hashes don't match.")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log("Checked "+ offers.length + ' hashes.');
}

// --- 5. Check individual proofs retrieved from API with local root hash. ---
const getProof = async function(offer) {
  try {
    return await axios.get(baseurl+'/api/offers/proof', {
      params: {
        username: offer.username,
        date: offer.date
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const checkProofs = async function(offers){
  for(i = 0; i < offers.length; i++){
    await getProof(offers[i])
      .then((res) => {
        const tree = new MerkleTree([], SHA256);
        const leaf = offers[i].hash;

        // The Proof object contains a Buffer type,
        // which gets converted into a normal object for the JSON format.
        // It needs to be converted back explicitely.
        const proof = res.data.map((x) =>{
          x.data = Buffer.from(x.data.data);
          return x;
        })

        if(!tree.verify(proof, leaf, localRoot)){
          console.log("ERROR: Proof doesn't match.")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  console.log("Checked "+ offers.length + ' proofs.');
}

// --- Execute async functions from 3-5 ---
const execTest = async function(){
  await sendAllOffers(randomOffers);
  await checkHashes(randomOffers);
  await checkProofs(randomOffers);
  console.log("Finished 3 tests. Everything seems correct.")
}

execTest()
