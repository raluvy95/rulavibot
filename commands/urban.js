const Discord = require('discord.js');
const urban = require('relevant-urban');

module.exports.run = async (bot, message, args, tools) => {
  if (!args[0]) return message.channel.send(`***Please specify some text!***`);
  let res = await urban(args.join(' ')).catch(e => {
    return message.channel.send('***Sorry, that word was not found!***');
  });

  const embed = new Discord.MessageEmbed()
    .setColor('#ADD8E6')
    .setTitle(res.word)
    .setUrl(res.urbanURL)
    .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`)
    .setField('Author', res.author, true)
    .addField('Rating', `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`)

  if (res.tags.length > 0 && res.tags.join(' ').length < 1024) {
    embed.addField('Tags', res.tags.join(', '), true) // This also creates an inline field holding the tags
  }

  message.channel.send(embed);

}

module.exports.help = {
    name:"urban"
  }
