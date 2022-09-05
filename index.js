const { EmbedBuilder, Embed } = require("discord.js");
const { areEqual, getIcon } = require("./assets/constats");
const { CONTRACT_INSTANCE, getTotalSupply } = require("./web3.config");
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

    let description = `Token Id: ${tokenId}.
    \ntransaction: https://etherscan.io/tx/${transactionHash}`;
    try {
      const [totalSupply, maxSupply] = await Promise.all(
        getTotalSupply(),
        getMaxSupply()
      );

      description = `Token Id: ${tokenId}.
      \nRemaning NFTs ${maxSupply - totalSupply}
      \ntransaction: https://etherscan.io/tx/${transactionHash}`;
    } catch (e) {}

    const mintNotification = new EmbedBuilder()
      .setTitle("NFT Mint")

      .setDescription(description)
      .setThumbnail(getIcon())
      .setFooter({ text: new Date(Date.now()).toString() })
      .setColor(0x00ffff);

    sendMessage(mintNotification);
  }
);

getTotalSupply()
  .then((totalSupply) => {
    const TotalMintedNFTsNotifications = new EmbedBuilder()
      .setTitle("Total Minted NFTs")

      .setDescription(`Total Supply: ${totalSupply}`)
      .setThumbnail(getIcon())

      .setFooter({ text: new Date(Date.now()).toString() })

      .setColor(0x00ffff);

    sendMessage(TotalMintedNFTsNotifications);
  })
  .catch(console.error);
