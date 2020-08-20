const path = require('path');
const fs = require('fs'); 
const TruffleContract = require('@truffle/contract'); 
const Web3 = require('web3');


const DEVELOP = false;

// Read Truffle config
const truffleConfig = require('../../truffle/truffle-config.js');
const ALF_CONTRACT = path.resolve(__dirname, '..', '..', 'truffle/build/contracts', 'ALFTransparency.json'); 

let ALFProvider = truffleConfig.networks.volta.provider();
if(DEVELOP){
    let rpcURL = 'ws://'+truffleConfig.networks.development.host +':'+ truffleConfig.networks.development.port;
    ALFProvider = new Web3.providers.WebsocketProvider(rpcURL);
    // TODO: add owner key to provider!
}

const web3 = new Web3(ALFProvider);

function loadContract(file, provider) { 
    return new Promise(function (resolve, reject) { 
        fs.readFile(file, 'utf-8', function (err, data) { 
            if (err) { 
                reject(err); 
            } else { 
                let contract = TruffleContract(JSON.parse(data)); 
                try {
                    contract.setProvider(provider);
                } catch (err){
                    reject(err);
                }
                resolve(contract); 
            } 
        }); 
    }); 
} 


// interact with contract, use test for guidance!

exports.storeRootHash = async (rootHash, username, timestamp) => {
    // Read ALF contract in truffle contract form
    const ALFTransparency = await loadContract(ALF_CONTRACT, ALFProvider);
    let alfTransparencyContract = await ALFTransparency.deployed();
    let accounts = await web3.eth.getAccounts();
    return alfTransparencyContract.sendHash(rootHash, username, timestamp, { from: accounts[0] });
}

exports.getHash = async(timestamp) => {
    // Read ALF contract in truffle contract form
    const ALFTransparency = await loadContract(ALF_CONTRACT, ALFProvider);
    let alfTransparencyContract = await ALFTransparency.deployed();
    let accounts = await web3.eth.getAccounts();
    return alfTransparencyContract.getHash(timestamp);
}