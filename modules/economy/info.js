const {RichEmbed} = require("discord.js")

module.exports = {
  name: "info",
  module: "economy",
  description: "Shows yourself or a user in database👀",
  cooldown: 5,
  execute: (message, args, gd, client) => {
    let arg = message.mentions.users.first()
    if(!arg) {
      arg = message.guild.members.find(m => m.user.username.toLowerCase() == args.join(" ").toLowerCase() || m.user.tag.toLowerCase() == args.join(" ").toLowerCase() || m.user.id == args[0]
                                      )
      if(!arg) arg = message.author                  
    }
    let fetch = client.db.get(!arg.id ? arg.user.tag : arg.id)
    if(!fetch) return message.channel.send("There's no your data in our database.")
    let counts = {}
    let e = new RichEmbed()
    .setAuthor(!arg.user ? arg.tag : arg.user.tag)
    .setDescription(`**Geometry Dash username:** \`${!fetch.gd ? "No GD linked" : fetch.gd}\`\n**Diamonds:** \`${!fetch.diamonds ? "No diamonds" : fetch.diamonds}\`\n**Orbs:** ${!fetch.orbs ? "No orbs" : fetch.orbs}\n**Skills:** ${fetch.skill}%`)
    .addField(`Icons collection (${!fetch.icons ? 0 : fetch.icons.length})`, !fetch.icons ? "No icons showed here" : fetch.icons.length < 1 ? "No icons" : fetch.icons.join(", "))
    .setColor("RANDOM")
    return message.channel.send(e)
  }
}