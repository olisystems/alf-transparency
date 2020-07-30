# Comparison of Libraries for Constructing Merkle Tree

This article will make a comparison between [merkle-tools](https://github.com/Tierion/merkle-tools) (GitHub stars: 56) and [MerkleTree.js](https://github.com/miguelmota/merkletreejs) (GitHub stars: 190) for constructing Merkle tree.

**Table of Contents**

<!-- MDTOC maxdepth:6 firsth1:0 numbering:1 flatten:0 bullets:0 updateOnSave:1 -->

1. [Installation](#installation)
2. [Leaves](#leaves)
3. [Merkle Tree](#merkle-tree)
4. [Merkle Root](#merkle-root)
5. [Create Proof](#create-proof)
6. [Utilities](#utilities)

<!-- /MDTOC -->

## Installation

- **MerkleTools**

```
var MerkleTools = require('merkle-tools')
var merkleTools = new MerkleTools()
```

- **MerkleTree**

```
const { MerkleTree } = require('merkletreejs')
const SHA256 = require('crypto-js/sha256')
```

`MerkleTools` uses the default `SHA256` method for hashing. Whereas, `MerkleTree` explicitly requires the `SHA256`.

## Leaves

Let's say we have following data:

```
var a = 'a'
var b = 'b'
var c = 'c'
var d = 'd'
```

- **MerkleTools**

Possible data inputs are hex strings or buffers. It's also possible to hash the strings prior to adding them as leaves to the tree by using the `true` option.

Additionally, we can add an array of values.

```
merkleTools.addLeaf(a, true)
merkleTools.addLeaf(b, true)
merkleTools.addLeaf(c, true)
merkleTools.addLeaf(d, true)
```

- **MerkleTree**

Creates hashes array of values and then uses resultant array to create Merkle tree:

```
const leaves = [a, b, c, d].map((x) => SHA256(x))
```

## Merkle Tree

- **MerkleTools**

```
merkleTools.makeTree()
```

- **MerkleTree**

```
const tree = new MerkleTree(leaves, SHA256)
```

## Merkle Root

- **MerkleTools**

```
var rootValue = merkleTools.getMerkleRoot().toString('hex')
```

The result will be root value as hex:

```
14ede5e8e97ad9372327728f5099b95604a39593cac3bd38a343ad76205213e7
```

- **MerkleTree**

```
const root = tree.getRoot().toString('hex')
```

The result is the same hex as above:

```
14ede5e8e97ad9372327728f5099b95604a39593cac3bd38a343ad76205213e7
```

## Create Proof

Returns the proof as an array of hash objects for the leaf at the given index.

Returns `null` in case tree is not ready or no leaf exists at the given index.

- **MerkleTools**

```
var proof = merkleTools.getProof(2)
```

The result is:

```
[
  {
    right: '18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4'
  },
  {
    left: 'e5a01fee14e0ed5c48714f22180f25ad8365b53f9779f79dc4a3d7e93963f94a'
  }
]
```

Validate proof:
Let's say we want to validate leaf at index 2.

```
var proof = merkleTools.getProof(2)
var targetHash = merkleTools.getLeaf(2).toString('hex')
var merkleRoot = merkleTools.getMerkleRoot().toString('hex')

var isValid = merkleTools.validateProof(proof, targetHash, merkleRoot)
```

returns boolean `true` or `false`.

- **MerkleTree**

First create leaf and then create proof:

```
const leaf = SHA256('a')
const proof = tree.getProof(leaf)
```

The result is:

```
[
  {
    position: 'right',
    data: <Buffer 3e 23 e8 16 00 39 59 4a 33 89 4f 65 64 e1 b1 34 8b bd 7a 00 88 d4 2c 4a cb 73 ee ae d5 9c 00 9d>
  },
  {
    position: 'right',
    data: <Buffer bf fe 0b 34 db a1 6b c6 fa c1 7c 08 ba c5 5d 67 6c de d5 a4 ad e4 1f e2 c9 92 4a 5d de 8f 3e 5b>
  }
]
```

Verify proof:

```
const verify = tree.verify(proof, leaf, root)
```

The result will be a boolean `true` or `false`.

## Utilities

- **MerkleTools**

```
// get number of leaves
var leafCount = merkleTools.getLeafCount()
// result: 4

// get leaf buffer at a specific index
var leafValue = merkleTools.getLeaf(2).toString('hex')
// result: 2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6

// check if tree is built
var isReady = merkleTools.getTreeReadyState()
//result: true
```

- **MerkleTree**

```

// get leaf hashes
const layers = tree.getHexLayers()
// result:
[
  [
    '0xca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
    '0x3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
    '0x2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6',
    '0x18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4'
  ],
  [
    '0xe5a01fee14e0ed5c48714f22180f25ad8365b53f9779f79dc4a3d7e93963f94a',
    '0xbffe0b34dba16bc6fac17c08bac55d676cded5a4ade41fe2c9924a5dde8f3e5b'
  ],
  [
    '0x14ede5e8e97ad9372327728f5099b95604a39593cac3bd38a343ad76205213e7'
  ]
]

// get hex leaves
const hexLeaves = tree.getHexLeaves()
// result:
[
  '0xca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb',
  '0x3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d',
  '0x2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6',
  '0x18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4'
]

// print Merkle tree
MerkleTree.print(tree)
//result:
└─ 14ede5e8e97ad9372327728f5099b95604a39593cac3bd38a343ad76205213e7
   ├─ e5a01fee14e0ed5c48714f22180f25ad8365b53f9779f79dc4a3d7e93963f94a
   │  ├─ ca978112ca1bbdcafac231b39a23dc4da786eff8147c4e72b9807785afee48bb
   │  └─ 3e23e8160039594a33894f6564e1b1348bbd7a0088d42c4acb73eeaed59c009d
   └─ bffe0b34dba16bc6fac17c08bac55d676cded5a4ade41fe2c9924a5dde8f3e5b
      ├─ 2e7d2c03a9507ae265ecf5b5356885a53393a2029d241394997265a1a25aefc6
      └─ 18ac3e7343f016890c510e93f935261169d9e3f565436429830faf0934f4f8e4

```
