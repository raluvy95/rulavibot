const shop = require("./../../_shop.json")
const {RichEmbed} = require("discord.js")
module.exports = {
  name: "shop",
  module: "economy",
  description: "Show a server shop!",
  cooldown: 15,
  execute: (message, args) => { 
    let emoji = {
      0: "<:orbs:671353665638105134>",
      1: "<:diamond:670717315834183690>"
    };
    let e = new RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setThumbnail(message.guild.iconURL)
    .setColor("RANDOM")
    .setFooter("Use v!buy <ID> [almount] to buy a item!")
    for(let m of shop) {
      e.addField(`\`ID: ${m.id}\` - **${m.item}** - ${emoji[m.costtype]} ${m.cost}`, `${m.description} | **Rewards:** ${m.rewards.diamond ? "1 diamond" : m.rewards.icon ? "New cube: " + m.rewards.icon : "None"}`)
    }
    return message.channel.send(e)
  }
}