import alfTransparencyArtifact from './contracts/ALFTransparency'
import web3 from './web3'

const Contract = async () => {
  //This method find the network id to retrieve the configuration from truffle-config.js file
  const networkId = await web3.eth.net.getId()
  // Retrieve the Network configuration from truffle-config.js file
  const deployedNetwork = alfTransparencyArtifact.networks[networkId]
  // Initializing the contract
  const ALFTransparency = new web3.eth.Contract(
    alfTransparencyArtifact.abi,
    deployedNetwork.address,
  )

  return ALFTransparency
}

export default Contract
