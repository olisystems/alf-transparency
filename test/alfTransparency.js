const truffleAssert = require("truffle-assertions");
const ALFTransparency = artifacts.require("ALFTransparency");

contract("ALFTransparency", function (accounts) {
  // setting of test variables
  let owner = accounts[0];
  let consumerAccount = accounts[1];
  let alfTransparencyContract;
  let hash = "7b1a04da83bfcaa8cb98d1cf8189b1a7cc5bea96e6c5022e205ff8c0ee43a6ff";
  let docType = "Test Doc";
  let timestamp = 1589967386;

  // create global contract instance before executing tests
  before("setup contract", async () => {
    alfTransparencyContract = await ALFTransparency.deployed();
  });

  // test 2
  it("should send the hash", async () => {
    // set data value
    let result = await alfTransparencyContract.sendHash(
      hash,
      docType,
      timestamp,
      { from: owner }
    );

    // test event
    truffleAssert.eventEmitted(result, "NewHash", (ev) => {
      return (
        ev.docHash == hash && ev.docType == docType && ev.timestamp == timestamp
      );
    });
  });

  // test 2
  it("should fail to send the hash from a consumer account", async () => {
    await truffleAssert.reverts(
      alfTransparencyContract.sendHash(hash, docType, timestamp, {
        from: consumerAccount,
      })
    );
  });
});
