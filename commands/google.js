const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {



  let google = args.slice(0).join('+');

      let link = `https://www.google.com/search?q=` + google;
      if(!link)return message.reply("Console error")
      let embed = new Discord.RichEmbed()
	
  .setColor("RED")
  .setTimestamp()
  .addField('Action:', 'Searching on Google')
	.addField("Word:", `${args.slice(0).join(' ')}`)
	.addField('Link:', `${link}`)
	.setFooter("You're avatar", message.author.avatarURL);
          
	message.channel.send(embed);
	message.author.send(`You have searched for ${link} in ${ message.guild.name}`);
  
}



module.exports.help = {
    name: "google"
}
