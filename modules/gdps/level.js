const { RichEmbed } = require("discord.js");
const atob = require("atob")
module.exports = {
  name: "level",
  module: "gdps",
  aliases: ["l", "lvl"],
  description: "Get a level by ID or find a level",
  cooldown: 5,
  execute: async (message, args, gd) => {
    let arg = args.join(" ");
    if (!arg) return message.channel.send("Please use `v!level <ID or name>`");
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
          "Found a level!"
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
      return message.channel.send(e);
    }
    function isID() {
      return !isNaN(arg);
    }
    function isName() {
      return isNaN(arg);
    }
    if (isID()) {
      await getLevel(arg);
    } else if (isName()) {
      const find = await gd.api.levels.find({ query: arg });
      console.log(find);
      if (find.count == 0)
        return message.channel.send(
          "It looks like I cannot find your result! Please search more detali"
        );
      else if (find.count == 1) {
        let fetch = find.levels[0];
        await getLevel(String(fetch.levelID));
      } else {
        let e = new RichEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setColor("RANDOM")
          .setTitle(`Found some levels! (${find.count} found)`)
          .setDescription(
            find.levels
              .map(
                m =>
                  `\`ID: ${m.levelID}\` - Name: **${m.name}**\nLikes: ${m.likes} | Downloads: ${m.downloads}`
              )
              .join("\n\n")
          )
          .setFooter("Please type `select <ID>` to fetch a level!");
        const filter = answer => {
          return (
            answer.author.id == message.author.id &&
            answer.channel.id == message.channel.id
          );
        };
        message.channel
          .send(e)
          .then(
            message.channel
              .awaitMessages(filter, { max: 1, time: 10000, errors: ["time"] })
              .then(async a => {
                  if (a.map(m => m.content).join(" ").startsWith("select ")) {
                    if(a.map(m => m.content).join(" ") == "select") return message.channel.send("What are you doing with `select`???? Syntax: `select <ID>`, then try again.")
                    const select = a.map(m =>m.content).join(" ").slice("select".length)
                    await getLevel(select)
                  }
              })
          );
      }
    }
  }
};
