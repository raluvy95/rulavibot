const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
let text = args.join("/");
let doge = new Discord.RichEmbed()
.setColor("#FFA500")
.setTitle("Wow! Much doge! Such amazing!")
.setImage(url="http://dogr.io/"+text+"/.png?split=false")
.setTimestamp()


message.channel.send(doge);
}

module.exports.help = {
    name:"doge"
  }