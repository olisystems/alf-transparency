pragma solidity >=0.4.22 <0.7.0;

/// @title ALFTransparency
/// @notice Implements offer hashing on the basis of the ALF Flex Market
/// @dev store Merkle root hash on the blockchain
contract ALFTransparency {
    /// @notice owner of the contract
    address public owner;

    /// @notice sets contract creating account as owner
    /// @dev register the creator of the contract
    constructor() public {
        owner = msg.sender;
    }

    /// create Hash struct with three fields
    struct Hash {
        string rootHash;
        uint256 timestamp;
        bool stored;
    }

    /// @dev Modifier to check that the caller is the owner of the contract
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can send hash.");
        _;
    }

    /// @notice event fired when a hash is sent
    event NewHash(string rootHash, string date, uint256 timestamp);

    /// @notice map timestamp to Hash struct
    mapping(string => Hash) private hashes;

    /// @notice send Merkle root hash and username
    /// @dev fire the event when hash is sent
    /// @param _rootHash Merkle root hash
    /// @param _date date when the root hash was created
    function sendHash(string memory _rootHash, string memory _date)
        public
        onlyOwner
    {
        require(!hashes[_date].stored, "Hash is already stored.");
        hashes[_date] = Hash(_rootHash, now, true);
        emit NewHash(_rootHash, _date, now);
    }

    /// @notice get the hash for a given date
    /// @dev returns the root hash for a given timestamp
    /// @param _date day for which the root hash was created
    /// @return root Merkle root hash and timestamp
    function getHash(string memory _date)
        public
        view
        returns (string memory, uint256)
    {
        return (hashes[_date].rootHash, hashes[_date].timestamp);
    }
}
