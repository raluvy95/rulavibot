const Discord = require("discord.js");
const superagent = require("superagent")


module.exports.run = async (bot, message, args) => {
 
    let {body} = await superagent
    .get(`https://api-to.get-a.life/meme`)
    if(!{body}) return message.channel.send("OOF?! Try again.")

        let mEmbed = new Discord.RichEmbed()
        .setAuthor(body.text)
        .setColor("#FFA500")
        .setImage(body.url)
        .setTimestamp()

        message.channel.send({embed: mEmbed})

}

module.exports.help = {
    name:"meme"
  }
