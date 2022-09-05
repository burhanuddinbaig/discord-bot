const { WebhookClient } = require("discord.js");
const { getIcon } = require("./assets/constats");
const { webhookUrl } = require("./configs");

const webhookClient = new WebhookClient({ url: webhookUrl });

function sendMessage(message) {
  webhookClient.send({
    username: "nfts-counter",
    avatarURL: getIcon(),
    embeds: [message],
  });
}

module.exports = { sendMessage };
