const {RichEmbed} = require("discord.js")
const atob = require("atob")
module.exports = {
  name: "daily",
  module: "gdps",
  description: "Show the current daily level",
  cooldown: 10,
  execute: async (message, args, gd) => {
    let a = await gd.api.levels.getDaily()
    if(!a) return message.channel.send("There's no current daily level")
    let diff = {
      Auto: "<:Auto:670582001882890270> Auto",
      NA: "<:NA:670582306121187339> N/A",
      Easy: "<:Easy:670582479756984360> Easy",
      Normal: "<:Normal:670582567052771328> Normal",
      Hard: "<:Hard:670582497897349126> Hard",
      Harder: "<:Harder:670582512141074452> Harder",
      Insane: "<:Insane:670582541300006933> Insane",
      EasyDemon: "<:EasyDemon:670582144061538304> Easy Demon",
      MediumDemon: "<:MediumDemon:670582265142575115> Medium Demon",
      HardDemon: "<:HardDemon:670582021843583007> Hard Demon",
      InsaneDemon: "<:InsaneDemon:670582363562180608> Insane Demon",
      ExtremeDemon: "<:ExtremeDemon:670582079502942219> Extreme Demon"
    }
    let gamev = String(a.gameVersion)
    const e = new RichEmbed()
    .setAuthor("Daily Level!", "https://images-ext-2.discordapp.net/external/WmbQOWwJgceD7Ag9QF07ZYU_q6-fSdbsDRpnCBROk3c/https/i.imgur.com/enpYuB8.png")
    .setTitle(`${a.name}`)
    .setDescription(atob(a.desc))
    .setColor("RANDOM")
    .addField("Versions", `**Minimum GD version required to play this level:** ${gamev[0]}.${gamev[1]}\n**Level Version:** ${a.version}`)
    .addField("Stats", `**Difficulity:** ${diff[a.diff]} (${a.stars} stars)\n**Downloads:** ${a.downloads}\n**Likes:** ${a.likes}\n**Length:** ${a.length}\n**Song ID:** ${a.songID}\n**Original Level ID:** ${a.original}`)
    .addField("Other", `Is that featured level? ${a.isFeatured ? "Yes" : "No"}\nHas LDM? ${a.isLDM ? "Yes" : "No"}\nIs that epic level? ${a.isEpic ? "Yes" : "No"}\nPassword: ${a.password ? "||" + a.password + "||" : "No"} `)
    .setFooter(`ID: ${a.levelID}`)
    .setTimestamp()
    return message.channel.send(e)
  }
}