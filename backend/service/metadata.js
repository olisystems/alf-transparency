const ADDRESS = '0x8995Dd6828c6411172715385D2ba9351382A0FDf'
const ABI = [
  {
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'string',
        name: 'rootHash',
        type: 'string',
      },
      { indexed: false, internalType: 'string', name: 'user', type: 'string' },
      {
        indexed: false,
        internalType: 'string',
        name: 'timestamp',
        type: 'string',
      },
    ],
    name: 'NewHash',
    type: 'event',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      { internalType: 'string', name: '_rootHash', type: 'string' },
      { internalType: 'string', name: '_user', type: 'string' },
      { internalType: 'string', name: '_timestamp', type: 'string' },
    ],
    name: 'sendHash',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [{ internalType: 'string', name: '_timestamp', type: 'string' }],
    name: 'getHash',
    outputs: [
      { internalType: 'string', name: '', type: 'string' },
      { internalType: 'string', name: '', type: 'string' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
]
module.exports = { ADDRESS, ABI }
