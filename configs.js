// Using REST
require("dotenv").config();

const webhookUrl = process.env.WEBHOOK_URL;

const CONTRACT_ADDRESS = "0x30ccf3Af1152791BB6220c78484a6E08DBE2d1dc";

const INFURA_URL = `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`;

module.exports = {
  webhookUrl,
  CONTRACT_ADDRESS,
  INFURA_URL,
};
