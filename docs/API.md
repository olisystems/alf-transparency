# ALF Transparency REST API
ALF Transparency REST API is designed to create offers, retrieve offer information and perform verification.

## API Endpoints
The root path for the API is `https://verify.flexibilitaetsmarkt.de:3000/`.

### Create Offer
Create a new offer.
```
/api/offers/
```

- HTTP-Method: POST
- Connected function: `create()`
- Parameter: JSON-Object with following form:
```javascript
{
    username: 'string',
    date: 'string',
    hash: 'string'
}
```
### Get Offer by Usrname and Date
Find an offer by a given username and date.
```
/api/offers/byUsernameDate
```

- HTTP-Methode: GET
- Connected function: `findByUsernameDate()`
- Parameter: Query with following form:
```
?username=<USERNAME>&date=<DATE>
```
### Send Root Hash
Create a Merkle tree for all offers of a given date and store the resulting root hash on the Volta Blockchain.
```
/api/offers/rootHashTrigger
```

- HTTP-Methode: GET
- Connected function: `storeRootHash()`
- Parameter: Query with following form:
```
?date=<DATE>
```
### Get Proof
Fetch a MerkleTree.js-Proof for an offer with a given username and date. The proof can be used to reconstruct/verify a root hash.
```
/api/offers/proof
```
- HTTP-Methode: GET
- Connected function: `getProof()`
- Parameter: Query with following form:
```
?username=<USERNAME>&date=<DATE>
```
