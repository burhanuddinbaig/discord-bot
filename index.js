const { EmbedBuilder, Embed } = require("discord.js");
const { areEqual, getIcon, getTimeString } = require("./assets/constats");
const {
  CONTRACT_INSTANCE,
  getTotalSupply,
  getMaxSupply,
  getTransactionsData,
  decodeInputData,
} = require("./web3.config");
const { sendMessage } = require("./webhook.config");

let previousTxHash = null;
CONTRACT_INSTANCE.events.Transfer(
  {
    filter: {
      from: "0x0000000000000000000000000000000000000000", // we only want this event to be triggered for the Mint i.e. from Null Address
    },
    fromBlock: "latest",
  },
  async (error, data) => {
    if (error) return console.log("transferError: ", error); //sometimes ws does not able to connect with infura and throws an error.
    const {
      returnValues: { tokenId, to },
      transactionHash,
    } = data;

    if (areEqual(previousTxHash, transactionHash)) return; // if transaction hash is different than previous transaction hash run the function otherwise stop.
    previousTxHash = transactionHash; // update the previous transaction hash to the new transaction hash.

    let description =
      "Wohoo.. Someone has just minted a NFT. We are getting there.";
    try {
      const [totalSupply, transactionInfo, maxSupply] = await Promise.all([
        getTotalSupply(),
        getTransactionsData(transactionHash),
        getMaxSupply(),
      ]);

      const mintedNFTs = decodeInputData(transactionInfo.input);

      description = `
      Wohoo.. Someone has just minted ${mintedNFTs} NFT(s). We are getting there.
      \nTotal Minted NFTs\n${totalSupply}/${maxSupply}`;
    } catch (e) {}

    const mintNotification = new EmbedBuilder()
      .setTitle("NFT Mint")

      .setDescription(description)
      .setThumbnail(getIcon())
      .setFooter({ text: getTimeString() })
      .setColor(0x00ffff);

    sendMessage(mintNotification);
  }
);

getTotalSupply()
  .then(async (totalSupply) => {
    let maxSupply = 1000;
    try {
      maxSupply = await getMaxSupply();
    } catch (err) {
      console.log(err);
    }

    const TotalMintedNFTsNotifications = new EmbedBuilder()
      .setTitle("Total Minted NFTs")

      .setDescription(
        `Wohoo... Total ${totalSupply} NFTs have been minted.
      \nTotal Minted NFTs\n${totalSupply}/${maxSupply}
      `
      )
      .setThumbnail(getIcon())
      .setFooter({ text: getTimeString() })
      .setColor(0x00ffff);

    sendMessage(TotalMintedNFTsNotifications);
  })
  .catch(console.error);
