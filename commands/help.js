const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  message.react("📬") 
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("Help")
    .setDescription("List Commands.")
    .setColor("#FFA500")
    .addField("Fun", "`8ball`, `ask`, `kill`, `say`, `sayd`, `vote`")
    .addField("Info", "`botinfo`, `help`, `ping`")
    .addField("Moderation", "`kick`, `ban`, `purge`")
    .addField("Image", "`doge`, `achievement`, `meme`")
    .setTimestamp()
    .setFooter(`Use $ before using commands`);

    message.author.send(botembed);
}

module.exports.help = {
  name:("help")
}