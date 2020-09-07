const HDWalletProvider = require("@truffle/hdwallet-provider");
const NonceTrackerSubprovider = require("web3-provider-engine/subproviders/nonce-tracker");
const fs = require("fs");
const path = require("path");
const MNEMONIC = fs
  .readFileSync(path.resolve(__dirname, "./.mnemonic"))
  .toString()
  .trim();
var ENDPOINT = "https://volta-rpc.energyweb.org";

module.exports = {
  // custom path for smart contracts metadata
  contracts_build_directory: path.join(
    __dirname,
    "../app/src/assets/js/contracts"
  ),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
      websockets: true,
    },

    volta: {
      provider: function () {
        const wallet = new HDWalletProvider(MNEMONIC, ENDPOINT);
        const nonceTracker = new NonceTrackerSubprovider();
        wallet.engine._providers.unshift(nonceTracker);
        nonceTracker.setEngine(wallet.engine);
        return wallet;
      },
      network_id: 73799,
    },

    voltaRPC: {
      host: "80.158.47.134",
      port: 7546,
      network_id: 73799,
      websockets: true,
      from: "0x3D481ee06aFe587dAe5EAFA541c75c3D1F9dCdBc",
    },
  },

  plugins: ["solidity-coverage"],
  compilers: {
    solc: {
      version: "^0.5.0",
      optimizer: {
        enabled: true,
        runs: 200,
      },
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
};
