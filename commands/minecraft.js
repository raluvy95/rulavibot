const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
let text = args.join("+");
let mc = new Discord.RichEmbed()
.setColor("#FFA500")
.setImage(url="https://www.minecraftskinstealer.com/achievement/a.php?i=1&h=Achievement+get%21&t="+text);

message.channel.send(mc);
}

module.exports.help = {
    name:("mc")
  }