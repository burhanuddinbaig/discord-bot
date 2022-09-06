const Web3 = require("web3");
const abi = require("./assets/abi.json");
const { areEqual } = require("./assets/constats");
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

const getTransactionsData = async function (transactionHash) {
  return await web3.eth.getTransaction(transactionHash); // get transactin data
};

//
const decodeInputData = function (hexString) {
  const MINT_FUNCTION_SIGNATURE = "0xa0712d68";
  let volume = 1;
  const calledFunctionSignature = hexString.substring(0, 10); // extract called function signature and input data

  if (areEqual(MINT_FUNCTION_SIGNATURE, calledFunctionSignature)) {
    const volumeHex = "0x" + hexString.substring(10);
    volume = parseInt(volumeHex);
  }

  return volume;
};

module.exports = {
  CONTRACT_INSTANCE,
  getMaxSupply,
  getTotalSupply,
  getTransactionsData,
  decodeInputData,
};
