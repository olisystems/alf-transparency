# ALF Transparency

[![Build Status](https://travis-ci.org/olisystems/alf-transparency.svg?branch=master)](https://travis-ci.org/olisystems/alf-transparency)

Implements Hashing-Dashboard on the basis of the ALF Flex Market with Vue.js and the Ethereum netwrok

## Table of Contents

<!-- MDTOC maxdepth:6 firsth1:0 numbering:1 flatten:0 bullets:0 updateOnSave:1 -->

1. [Table of Contents](#table-of-contents)   
2. [Description](#description)   
3. [Getting Started](#getting-started)   
&emsp;3.1. [Prerequisites](#prerequisites)   
&emsp;3.2. [Installing](#installing)   
4. [Code Coverage](#code-coverage)   
5. [Built With](#built-with)   
6. [Contributing](#contributing)   

<!-- /MDTOC -->

## Description

The current project creates hashes of the given document using [web3 sha3](https://web3js.readthedocs.io/en/v1.2.7/web3-utils.html#sha3) function and stores them on [Volta](https://energyweb.atlassian.net/wiki/spaces/EWF/pages/702677023/Chain%3A+Volta+Test+Network) test network.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Please make sure you've already installed Truffle and enabled the MetaMask extension in your browser.

```
* Truffle v5.1.26 (core: 5.1.26)
* Solidity >= v0.5.16 (solc-js)
* Node >= v12.16.3
* Web3.js >= v1.2.7
* Metamask Chrome extension (connected with Volta)
```

Note: Please follow the [steps](https://energyweb.atlassian.net/wiki/spaces/EWF/pages/703201459/Volta+Connecting+to+Remote+RPC+and+Metamask) to connect Metamask with Volta.

### Installing

Follow the steps below to have development environment running:

1. Clone the repository:

```
git clone https://github.com/olisystems/alf-transparency.git
```

2. Change directory to `alf-transparency` folder and install all requisite npm packages (as listed in `package.json`):

```
cd alf-transparency
npm install
```

3. Compile the smart contracts:

```
truffle compile
```

This will create the smart contract artifacts in folder `app\src\assets\js\contracts`.

4. Migrate smart contracts to `volta` chain:

```
npm run migrate
```

Alternatively, migrate the contracts to the locally running `ganache`:

```
npm run ganache

truffle migrate
```

Optionally, you can use the following command to export contract deployment details in a text file.

```
truffle migrate -a | tee -a ./output.txt
```

5. Test smart contracts:

Run tests on Volta network:

```
npm run test
```

or run tests on `Ganache`

```
npm run ganache

truffle test
```

The following output shows the test results and estimated gas cost for each function execution:

```sh
Contract: ALFTransparency
    ✓ should send the hash (28399 gas)
    ✓ should fail to send the hash from a consumer account (24945 gas)

·---------------------------------------|----------------------------|-------------|----------------------------·
|  Solc version: 0.6.0+commit.26b70077  ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 6721975 gas  │
········································|····························|·············|·····························
|  Methods                                                                                                      │
························|···············|··············|·············|·············|··············|··············
|  Contract             ·  Method       ·  Min         ·  Max        ·  Avg        ·  # calls     ·  eur (avg)  │
························|···············|··············|·············|·············|··············|··············
|  ALFTransparency      ·  sendHash     ·           -  ·          -  ·      28399  ·           2  ·          -  │
························|···············|··············|·············|·············|··············|··············
|  Deployments                          ·                                          ·  % of limit  ·             │
········································|··············|·············|·············|··············|··············
|  ALFTransparency                      ·           -  ·          -  ·     330322  ·       4.9 %  ·          -  │
·---------------------------------------|--------------|-------------|-------------|--------------|-------------·

  2 passing (1s)

```

6. Compiles and hot-reloads for development, run the following command inside `app` directory:

```
npm run serve
```

Navigate to `localhost:8080` in your browser.

7. Compiles and minifies for production:

```
npm run build
```

## Code Coverage

Solidity-coverage is used to determine the code coverage of smart contract.

```sh
  Contract: ALFTransparency
    ✓ should send the hash (77ms)
    ✓ should fail to send the hash from a consumer account (89ms)


  2 passing (212ms)

----------------------|----------|----------|----------|----------|----------------|
File                  |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------------------|----------|----------|----------|----------|----------------|
 contracts/           |      100 |      100 |      100 |      100 |                |
  ALFTransparency.sol |      100 |      100 |      100 |      100 |                |
----------------------|----------|----------|----------|----------|----------------|
All files             |      100 |      100 |      100 |      100 |                |
----------------------|----------|----------|----------|----------|----------------|

```
## Built With

- [Ethereum](https://www.ethereum.org/) - Ethereum is a decentralized platform that runs smart contracts to make the web faster, safer, and more open.
- [Truffle Framework](http://truffleframework.com/) - Truffle is the most popular development framework for Ethereum with a mission to make your life a whole lot easier.
- [Vue.js](https://vuejs.org/) - The Progressive JavaScript Framework for building user interfaces.
- [Web3.js](https://web3js.readthedocs.io/en/v1.2.7/#web3-js-ethereum-javascript-api) - A collection of libraries which allow interacting with a local or remote ethereum node, using an HTTP or IPC connection.

## Contributing

Pull requests are welcome.

1. Fork the repository.
2. Create your new feature branch: `git checkout -b new-feature-branch`
3. Stage your changes: `git add .`
4. Commit the changes: `git commit -m "add commit message"`
5. `push` to the branch: `git push origin new-feature-branch`
6. Submit a `pull request`.
