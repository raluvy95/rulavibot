
const {RichEmbed} = require("discord.js")
module.exports = {
  name: "about",
  module: "utility",
  description: "Information about this bot",
  cooldown: 15,
  execute: (message, args) => {
    message.client.fetchUser("390540063609454593").then(a => {
      let txt = "**Information about this bot**\n\n-This bot was made by `{dev}`, running on Discord.js (Node.js, JavaScript) and **not a public bot**\nThis bot is for fetching from v0lt's GD database.\nYou can start using this bot by using `v!profile <your GD username>` and `v!help` for list of commands! "
      txt = txt.replace("{dev}", a.tag)
      let e = new RichEmbed()
      .setDescription(txt)
      .setColor("RANDOM")
      .setFooter(message.author.tag, message.author.avatarURL)
      return message.channel.send(e)
    })
  }
}