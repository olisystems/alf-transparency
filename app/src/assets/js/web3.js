/* eslint-disable */
import Web3 from "web3";

const VOLTA_NODE = "wss://volta-blockchain.my-oli.com";
var provider = new Web3.providers.WebsocketProvider(VOLTA_NODE);
var web3 = new Web3(provider);

// on connect
provider.on("connect", () => console.log("WS Connected"));

// on error
provider.on("error", () => {
  console.log("WS Error");
  console.log("Attempting to reconnect...");
  provider = new Web3.providers.WebsocketProvider(VOLTA_NODE);

  provider.on("connect", () => console.log("WS Re-connected"));

  web3.setProvider(provider);
});

// on connection close
provider.on("end", () => {
  console.log("WS closed");
  console.log("Attempting to reconnect...");
  provider = new Web3.providers.WebsocketProvider(VOLTA_NODE);

  provider.on("connect", () => console.log("WS Re-connected"));

  web3.setProvider(provider);
});

export default web3;
