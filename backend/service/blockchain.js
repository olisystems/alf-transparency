const Web3 = require('web3')
const { ADDRESS, ABI } = require('./metadata')
const web3 = new Web3('ws://80.158.47.134:7546')
// const web3 = new Web3('wss://volta-blockchain.my-oli.com')

const Contract = new web3.eth.Contract(ABI, ADDRESS)
module.exports = Contract
