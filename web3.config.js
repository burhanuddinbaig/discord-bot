const Web3 = require("web3");
const abi = require("./assets/abi.json");
const { INFURA_URL, CONTRACT_ADDRESS } = require("./configs");

const options = {
  timeout: 30000, // ms

  clientConfig: {
    // Useful to keep a connection alive
    keepalive: true,
    keepaliveInterval: 60000, // ms
  },

  // Enable auto reconnection
  reconnect: {
    auto: true,
    delay: 5000, // ms
    maxAttempts: 5,
    onTimeout: false,
  },
};

const web3 = new Web3(
  new Web3.providers.WebsocketProvider(INFURA_URL, options)
);

const CONTRACT_INSTANCE = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

const getTotalSupply = async function () {
  const totalSupply = await CONTRACT_INSTANCE.methods.totalSupply().call();
  return totalSupply;
};

const getMaxSupply = async function () {
  const maxSupply = await CONTRACT_INSTANCE.methods.maxSupply().call();
  return maxSupply;
};

module.exports = { CONTRACT_INSTANCE, getMaxSupply, getTotalSupply };
