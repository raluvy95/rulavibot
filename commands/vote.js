const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let question = args.slice(0).join(" ");

    if (args.length === 0)
    return message.reply('**Invalid Format:** `$vote <Question>`')
  
    const embed = new Discord.RichEmbed()
    .setTitle("A Poll Has Been Started!")
    .setColor("#5599ff")
    .setDescription(`${question}`)
    .setFooter(`Poll Started By: ${message.author.username}`, `${message.author.avatarURL}`)
  
    message.channel.send({embed})
    .then(msg => {
      msg.react('👍')
      msg.react('👎')
      msg.react('🤷')
    })
    .catch(() => console.error('Emoji failed to react.'));
  
  }
module.exports.help = {
    name:("vote")
  }