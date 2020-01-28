module.exports = {
  name: "restart",
  aliases: ["r"],
  module: "admin",
  ownerOnly: true,
  execute: (message, args) => {
    message.channel.send("Restarting...").then(m => {
      setTimeout(() => process.exit(), 1500)
    })
  }
}