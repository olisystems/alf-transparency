# ALFTransparency

_Implements doc hashing on the basis of the ALF Flex Market_

> Created By Muhammad Yahya @OLI Systems GmbH

send hash to the blockchain

## ALFTransparency

## NewHash - read

| name      | type    | description |
| --------- | ------- | ----------- |
| docHash   | string  |
| docType   | string  |
| timestamp | uint256 |

## creationTime - read

Returns:
|name |type |description
|-----|-----|-----------
||uint256|

## owner - read

Returns:
|name |type |description
|-----|-----|-----------
||address|

## sendHash - read

| name        | type    | description                         |
| ----------- | ------- | ----------------------------------- |
| \_docHash   | string  | sha3 hash of the document           |
| \_docType   | string  | document type                       |
| \_timestamp | uint256 | timestamp when the hash was created |

fire the event when hash is sent
