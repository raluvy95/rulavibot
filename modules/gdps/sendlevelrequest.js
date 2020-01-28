const {RichEmbed} = require("discord.js")
const atob = require("atob")
module.exports = {
  name: "sendlvlreq",
  module: "gdps",
  description: "Send your lvl req to this server!",
  aliases: ["lvlreq", "levelrequest", "sendlevelrequest", "sendlevelreq"],
  cooldown: 30,
  execute: async (message, args, gd) => {
    let arg = args[0]
    if(!arg) return message.channel.send("Please use `v!sendlvlreq <level ID>`")
    if(isNaN(arg)) return message.channel.send("That's not an ID lol")
    async function getLevel(ID) {
      let a = await gd.api.levels.getById({ levelID: ID, levelString: true });
      if (!a)
        return message.channel.send("It looks like I cannot get that level");
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
      };
      let gamev = String(a.gameVersion);
      const e = new RichEmbed()
        .setAuthor(
          "Level Request!"
        )
        .setTitle(`${a.name}`)
        .setDescription(atob(a.desc))
        .setColor("RANDOM")
        .addField(
          "Versions",
          `**Minimum GD version required to play this level:** ${gamev[0] + "." + gamev[1]}\n**Level Version:** ${a.version}`
        )
        .addField(
          "Stats",
          `**Difficulity:** ${diff[a.diff]} (${
            a.stars
          } stars)\n**Downloads:** ${a.downloads}\n**Likes:** ${
            a.likes
          }\n**Length:** ${a.length}\n**Song ID:** ${
            a.songID
          }\n**Original Level ID:** ${a.original}`
        )
        .addField(
          "Other",
          `Is that featured level? ${a.isFeatured ? "Yes" : "No"}\nHas LDM? ${
            a.isLDM ? "Yes" : "No"
          }\nIs that epic level? ${a.isEpic ? "Yes" : "No"}\nPassword: ${
            a.password ? "||" + a.password + "||" : "No"
          } `
        )
        .setFooter(`ID: ${a.levelID}`)
        .setTimestamp();
      await message.guild.channels.get("667070880802930699").send(`**${message.author.tag}** (${message.author.id}) sent this level request!`, {embed: e});
      await message.channel.send("Your level request has been sent to <#667070880802930699> !")
    }
    await getLevel(arg)
  }
}