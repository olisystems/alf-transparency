# ALF Transparency

[![Build Status](https://travis-ci.org/olisystems/alf-transparency.svg?branch=master)](https://travis-ci.org/olisystems/alf-transparency)

Implements Hashing-Dashboard on the basis of the ALF Flex Market with Vue.js and the Ethereum netwrok

## Table of Contents

<!-- MDTOC maxdepth:6 firsth1:0 numbering:1 flatten:0 bullets:0 updateOnSave:1 -->

1. [Table of Contents](#table-of-contents)   
2. [Description](#description)   
3. [Overview of the Stack](#overview-of-the-stack)   
4. [Getting Started](#getting-started)   
&emsp;4.1. [Prerequisites](#prerequisites)   
5. [Built With](#built-with)   
6. [Contributing](#contributing)   

<!-- /MDTOC -->

## Description

The current project creates hashes of the given document using [web3 sha3](https://web3js.readthedocs.io/en/v1.2.7/web3-utils.html#sha3) function and stores them on [Volta](https://energyweb.atlassian.net/wiki/spaces/EWF/pages/702677023/Chain%3A+Volta+Test+Network) test network.

## Overview of the Stack

- **MongoDB:** as data storage.
- **Express.js:** as the server-side web framework for Node.js and will be used to mange all the backend related stuff.
- **Vue.js:** as the JavaScript framework for the frontend and handling all the view-related stuff
- **Node.js:** as the main engine for the backend

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
