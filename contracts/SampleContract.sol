pragma solidity >=0.4.21 <0.7.0;


contract SampleContract {
    uint256 data;

    event NewData(address sender, uint256 data);

    function setData(uint256 x) public {
        data = x;
        emit NewData(msg.sender, x);
    }

    function getData() public view returns (uint256) {
        return data;
    }
}
