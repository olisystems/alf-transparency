pragma solidity >=0.5.0 <0.7.0;


/// @title ALFTransparency
/// @author Muhammad Yahya @OLI Systems GmbH
/// @notice Implements doc hashing on the basis of the ALF Flex Market
/// @dev send hash to the blockchain
contract ALFTransparency {
    /// @notice sets contract creating account as owner at the construction
    address public owner = msg.sender;
    /// @notice contract creation time
    uint256 public creationTime = now;

    /// @dev Modifier to check that the caller is the owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can send hash.");
        _;
    }

    /// @notice event fired when a hash is sent
    event NewHash(string docHash, string docType, uint256 timestamp);

    /// @notice send document hash with doc type and timestamp
    /// @dev fire the event when hash is sent
    /// @param _docHash sha3 hash of the document
    /// @param _docType document type
    /// @param _timestamp timestamp when the hash was created
    function sendHash(
        string memory _docHash,
        string memory _docType,
        uint256 _timestamp
    ) public onlyOwner {
        emit NewHash(_docHash, _docType, _timestamp);
    }
}
