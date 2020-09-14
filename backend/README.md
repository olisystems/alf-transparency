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
- Connected function: `create()`
- Description: 
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
- Connected function: `findByUsernameDate()`
- Parameter: Query with following form:
```
?username=<USERNAME>&date=<DATE>
```

`/api/offers/rootHashTrigger`
- HTTP-Methode: GET
- Connected function: `storeRootHash()`
- Parameter: Query with following form:
```
?date=<DATE>
```

`/api/offers/proof`
- HTTP-Methode: GET
- Connected function: `getProof()`
- Parameter: Query with following form:
```
?username=<USERNAME>&date=<DATE>
```
