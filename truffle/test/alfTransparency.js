const truffleAssert = require('truffle-assertions')
const ALFTransparency = artifacts.require('ALFTransparency')

contract('ALFTransparency', function (accounts) {
  // setting of test variables
  let owner = accounts[0]
  let user = accounts[1]
  let alfTransparencyContract
  let hash = '7b1a04da83bfcaa8cb98d1cf8189b1a7cc5bea96e6c5022e205ff8c0ee43a6ff'
  let date = '2020-09-11'

  // create global contract instance before executing tests
  before('setup contract', async () => {
    alfTransparencyContract = await ALFTransparency.deployed()
  })

  // test 1
  it('should set creator as owner', async () => {
    // set data value
    const result = await alfTransparencyContract.owner.call()
    assert.equal(result, owner, 'Failed to set creator as owner')
  })

  // test 2
  it('should send the hash by owner', async () => {
    // set data value
    const result = await alfTransparencyContract.sendHash(
      hash,
      date,
      { from: owner },
    )

    // test event
    truffleAssert.eventEmitted(result, 'NewHash', (ev) => {
      return (
        ev.rootHash == hash && ev.date == date
      )
    })
  })

  // test 3
  it('should fail to send the hash with the same timestamp', async () => {
    await truffleAssert.reverts(
      alfTransparencyContract.sendHash(hash, date, {
        from: owner,
      }),
    )
  })

  // test 4
  it('should fail to send the hash from the user account', async () => {
    await truffleAssert.reverts(
      alfTransparencyContract.sendHash(hash, date, {
        from: user,
      }),
    )
  })

  // test 5
  it('should return hash and date', async () => {
    // set data value
    const result = await alfTransparencyContract.getHash.call(date)
    assert.equal(result[0], hash, 'Failed to get correct hash')
  })
})
