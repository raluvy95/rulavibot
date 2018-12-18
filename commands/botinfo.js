const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
 
    let bicon = bot.user.displayAvatarURL
    let owneruser = ("<@390540063609454593>")
    let days = Math.floor(bot.uptime / 86400000);
    let hours = Math.floor(bot.uptime / 3600000) % 24;
    let minutes = Math.floor(bot.uptime / 60000) % 60;
    let seconds = Math.floor(bot.uptime / 1000) % 60;
    let botembed = new Discord.RichEmbed()
    .setColor("#FF0000")
    .setThumbnail(bicon)
    .addField("Total Servers", bot.guilds.size, inline=true)
    .addField("Total Users", bot.users.size, inline=true)
    .addField("Library", "discord.js", inline=true)
    .addField("Owner Bot", owneruser, inline=true)
    .addField("Uptime", days+"d "+hours+"h "+minutes+"m "+seconds+"s", inline=true)
    .addField("Created On", bot.user.createdAt, inline=true)
    .setFooter("Thank you for using Rulavi <3")
    .setTimestamp(message.createdAt);

    message.channel.send(botembed);
}

module.exports.help = {
  name: "botinfo",
  alias: "stats"
}