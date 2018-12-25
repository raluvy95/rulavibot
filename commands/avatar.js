const Discord = require('discord.js')

module.exports.run = (bot, message, args, tools) => {
    
    let user = message.mentions.users.first() || message.author;
    
    const embed = new Discord.MessageEmbed()
        .setColor(0xffffff)
        .setTitle(user.username)
        .setImage(user.avatarURL({size: 2048}))
        
    message.channel.send(embed)
    
}

module.exports.help = {
  name:("avatar")
}
