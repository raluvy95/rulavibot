const { RichEmbed } = require("discord.js");
module.exports = {
  name: "profile",
  module: "gdps",
  description: "Show a GD profile",
  aliases: ["viewprofile"],
  execute: async (message, args, gd, client) => {
    let arg = args.join(" ");
    if (!arg) {
     if (client.db.has(message.author.id)) {
       let check = client.db.get(`${message.author.id}.gd`);
       if(!check) return message.channel.send("Please use `v!profile <GD username or ID>`")
       else arg = check
    } else {
        return message.channel.send(
          "Please use `v!profile <GD username or ID>`"
        );
      }
    }
    let user = await gd.api.users.getByNick(arg);
    if (!user) {
      user = await gd.api.users.getById(arg)
      if(!user) return message.channel.send("It looks like that user is not found");
    }
    let mod = {
      0: "Regular Member",
      1: "<:Mod:670582814198071319> Moderator",
      2: "<:ElderMod:670582850176811016> Elder Moderator"
    };
    let star = "<:Star:670582447263711252>";
    let dmd = "<:diamond:670717315834183690>";
    let ucoin = "<:UserCoin:670582406788677642>";
    let scoin = "<:scoin:670718345711976487>";
    let demon = "<:HardDemon:670582021843583007>";
    let cp = "<:cp:670720049174020106>";
    function social() {
      let a = "";
      if (user.youtube) a += `[YouTube Channel URL](${user.youtube})\n`;
      if (user.twitter) a += `[Twitter](${user.twitter})\n`;
      if (user.twitch) a += `[Twitch](${user.twitch})`;
      if (!a.lenght) a = "No social media";
      return a;
    }
    const e = new RichEmbed()
      .setAuthor(message.author.tag, message.author.avatarURL)
      .setTitle(`ID: ${user.userID} | ${user.nick}`)
      .setDescription(
        `${mod[user.rights]}\n${star} ${user.stars} | ${dmd} ${
          user.diamonds
        } | ${ucoin} ${user.userCoins} | ${scoin} ${user.coins} | ${demon} ${
          user.demons
        } | ${cp} ${user.creatorPoints}`
      )
      .addField("Top", `#${user.top}`)
      .setColor("RANDOM")
      .addField("Social Media", social());
    return message.channel.send(e);
  }
};
