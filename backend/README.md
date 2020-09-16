# ALF Transparency - Backend
## Installation
Install all required packages using
```
npm install
```

Install MongoDB separately and run the daemon according to your operating systems instructions. See the [MongoDB Documentation](https://docs.mongodb.com/manual/administration/install-community/)

To run the server application, run
```
node server.js
```
## API Endpoints
`/api/offers/`
- HTTP-Method: POST
- Description: Create a new offer.
- Connected function: `create()`
- Parameter: JSON-Object with following form:
```javascript
{
    username: 'string',
    date: 'string',
    hash: 'string'
}
```

`/api/offers/byUsernameDate`
- HTTP-Methode: GET
- Description: Find an offer by a given username and date.
- Connected function: `findByUsernameDate()`
- Parameter: Query with following form:
```
?username=<USERNAME>&date=<DATE>
```

`/api/offers/rootHashTrigger`
- HTTP-Methode: GET
- Description: Create a Merkle tree for all offers of a given date and store the resulting root hash on the Volta Blockchain.
- Connected function: `storeRootHash()`
- Parameter: Query with following form:
```
?date=<DATE>
```

`/api/offers/proof`
- HTTP-Methode: GET
- Description: Fetch a MerkleTree.js-Proof for an offer with a given username and date. The proof can be used to reconstruct/verify a root hash.
- Connected function: `getProof()`
- Parameter: Query with following form:
```
?username=<USERNAME>&date=<DATE>
```
