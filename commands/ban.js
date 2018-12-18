const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't find user!\n**Use:** `r?ban <user> <reason>`");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("OOf? **You don't have premission to run this command!**");
    if(kUser.hasPermission("ADMINISTRATOR")) return message.channel.send(":x: | **That user is an administrator premission.. so I can't ban that!**");

    message.guild.member(kUser).ban(kReason);
    message.channel.send(":ok_hand: | **I banned that guy**");
}

module.exports.help = {
  name:"ban"
}