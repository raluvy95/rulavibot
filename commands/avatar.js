const Discord = require('discord.js')

module.exports.run = (bot, message, args, tools) => {
    
    let user = message.mentions.users.first() || message.author;
    
    message.channel.send(user.avatarURL)
    
}

module.exports.help = {
  name:("avatar")
}
