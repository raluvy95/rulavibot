const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    message.channel.send(':ping_pong: | **Pong!** `' + bot.ping + 'ms`');
}

module.exports.help = {
  name:("ping")
}