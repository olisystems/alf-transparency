const HDWalletProvider = require('@truffle/hdwallet-provider')
const NonceTrackerSubprovider = require('web3-provider-engine/subproviders/nonce-tracker')
const fs = require('fs')
const path = require('path')
const MNEMONIC = fs.readFileSync(path.resolve(__dirname, './.mnemonic')).toString().trim()
var ENDPOINT = 'https://volta-rpc.energyweb.org'
module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 8545,
      network_id: '*',
      websockets: true,
    },

    volta: {
      provider: function () {
        const wallet = new HDWalletProvider(MNEMONIC, ENDPOINT)
        const nonceTracker = new NonceTrackerSubprovider()
        wallet.engine._providers.unshift(nonceTracker)
        nonceTracker.setEngine(wallet.engine)
        return wallet
      },
      network_id: 73799,
    },
  },

  plugins: ['solidity-coverage'],
  compilers: {
    solc: {
      version: '^0.5.0',
    },
  },
  mocha: {
    enableTimeouts: false,
    //   reporter: 'eth-gas-reporter',
    //   reporterOptions: {
    //     excludeContracts: ['Migrations'],
    //     url: 'https://volta-rpc.energyweb.org',
    //   },
  },
}
