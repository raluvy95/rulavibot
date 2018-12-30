const Discord = require('discord.js')

module.exports.run = (bot, message, args, tools) => {
    
    let user = message.mentions.users.first() || message.author;
    
    const embed = new Discord.MessageEmbed()
        .setColor("#006400")
        .setTitle(user.username)
        .setImage(user.avatarURL)
        
    message.channel.send(embed)
    
}

module.exports.help = {
  name:("avatar")
}
