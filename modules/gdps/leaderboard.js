const {RichEmbed} = require("discord.js")

module.exports = {
  name: "leaderboard",
  aliases: ["top"],
  module: "gdps",
  cooldown: 10,
  description: "Show the leaderboard",
  execute: async (message, args, gd) => {
   
    let a = await gd.api.tops.get({type: 'top', count: 10})
    let e = new RichEmbed()
    .setAuthor("Leaderboard!", "https://s3-eu-west-1.amazonaws.com/members.gdprofiles.com/images/3f9b92dcaa52c03349cd0f2c4f9d90b8.png")
    .setDescription(a.map(m => `\`#${m.top}\` - **${m.nick}**`).join("\n\n"))
    .setFooter(message.author.tag, message.author.avatarURL)
    .setColor("RANDOM")
    .setThumbnail("https://s3-eu-west-1.amazonaws.com/members.gdprofiles.com/images/3f9b92dcaa52c03349cd0f2c4f9d90b8.png")
    return message.channel.send(e)
  }
}