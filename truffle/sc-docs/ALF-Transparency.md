# ALF Transparency - Smart Contract Development

**Table of Contents**

<!-- MDTOC maxdepth:6 firsth1:0 numbering:1 flatten:0 bullets:0 updateOnSave:1 -->

1. [Overview](#overview)
2. [Installing](#installing)
3. [Solidity Prettier and Linter](#solidity-prettier-and-linter)
4. [Test:](#test)
5. [Code Coverage](#code-coverage)
6. [ETH Gas Reporter](#eth-gas-reporter)

<!-- /MDTOC -->

## Overview

ALFTransparency - Implements offer hashing on the basis of the ALF Flex Market

<img src=./graph.png width="550" height="650">

## Installing

Follow the steps below to have development environment running:

1. Change directory to `truffle` folder and install all requisite npm packages (as listed in `package.json`):

```
cd truffle
npm install
```

2. Compile the smart contracts:

```
truffle compile
```

3. Migrate smart contracts to `volta` chain:

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

## Solidity Prettier and Linter

1. Run the following command to beautify the Solidity code:

```
$ npm run prettier
```

The output will be look like the following:

```sh
> prettier --write **/*.sol

contracts/ALFTransparency.sol 172ms
contracts/Migrations.sol 31ms
```

2. Identify the potential vulnerabilities by running the following command:

```
$ npm run slint
```

## Test:

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
> Compiled successfully using:
   - solc: 0.5.17+commit.d19bba13.Emscripten.clang

  Contract: ALFTransparency
    ✓ should set creator as owner (635ms)
    ✓ should send the hash by owner (8830ms)
    ✓ should fail to send the hash from the user account (3543ms)
    ✓ should return hash and username (633ms)

  4 passing (16s)
```

## Code Coverage

Solidity-coverage is used to determine the code coverage of smart contract.

```sh
Compiling your contracts...
===========================
✔ Fetching solc version list from solc-bin. Attempt #1
> Everything is up to date, there is nothing to compile.

  Contract: ALFTransparency
    ✓ should set creator as owner (40ms)
    ✓ should send the hash by owner (118ms)
    ✓ should fail to send the hash from the user account (78ms)
    ✓ should return hash and username

  4 passing (373ms)

----------------------|----------|----------|----------|----------|----------------|
File                  |  % Stmts | % Branch |  % Funcs |  % Lines |Uncovered Lines |
----------------------|----------|----------|----------|----------|----------------|
 contracts/           |      100 |      100 |      100 |      100 |                |
  ALFTransparency.sol |      100 |      100 |      100 |      100 |                |
----------------------|----------|----------|----------|----------|----------------|
All files             |      100 |      100 |      100 |      100 |                |
----------------------|----------|----------|----------|----------|----------------|

> Istanbul reports written to ./coverage/ and ./coverage.json
> solidity-coverage cleaning up, shutting down ganache server
```

## ETH Gas Reporter

In order to make an estimation of gas used for executing unit tests, uncomment the following block of code inside `truffle-config.js` and run the `npm run test` command:

```
mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      excludeContracts: ['Migrations'],
      url: 'https://volta-rpc.energyweb.org',
    },
  },
```

The reuslt will be similar to the following:

```
> Compiled successfully using:
   - solc: 0.5.17+commit.d19bba13.Emscripten.clang

  Contract: ALFTransparency
    ✓ should set creator as owner
    ✓ should send the hash by owner (1193109 gas)
    ✓ should fail to send the hash from the user account (25622 gas)
    ✓ should return hash and username

·----------------------------------------|----------------------------|-------------|----------------------------·
|  Solc version: 0.5.17+commit.d19bba13  ·  Optimizer enabled: false  ·  Runs: 200  ·  Block limit: 8000000 gas  │
·········································|····························|·············|·····························
|  Methods                               ·               51 gwei/gas                ·       334.00 eur/eth       │
························|················|··············|·············|·············|··············|··············
|  Contract             ·  Method        ·  Min         ·  Max        ·  Avg        ·  # calls     ·  eur (avg)  │
························|················|··············|·············|·············|··············|··············
|  ALFTransparency      ·  sendHash      ·           -  ·          -  ·     112787  ·           1  ·       1.92  │
························|················|··············|·············|·············|··············|··············
|  Deployments                           ·                                          ·  % of limit  ·             │
·········································|··············|·············|·············|··············|··············
|  ALFTransparency                       ·           -  ·          -  ·     636730  ·         8 %  ·      10.85  │
·----------------------------------------|--------------|-------------|-------------|--------------|-------------·

  4 passing (2m)
```
