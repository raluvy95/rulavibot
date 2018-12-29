const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    message.react("📬") 
    let user = message.author;
    message.react("📬") 
    message.channel.send('<a:Loading:465439021514883072> Loading...')
    .then((message)=>{
  setTimeout(function(){
    message.edit(`${user}, **Check your direct messages for a list of commands!**`);
  }, 10)});
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setTitle("Help")
    .setDescription("Join [Support Server]( https://discord.gg/bYYyDVU ) if you found bug/glitch command(s)!")
    .setColor("#FFA500")
    .addField("Fun", "`8ball`, `ask`, `flip`, `kill`, `reverse`, `rps`, `say`, `sayd`, `vote`")
    .addField("Info", "`botinfo`, `help`, `osu`, `google`, `ping`, `serverinfo`, `userinfo`")
    .addField("Moderation", "`kick`, `ban`, `purge`")
    .addField("Image", "`doge`, `achievement`, `meme`")
    .setTimestamp()
    .setFooter(`Use $ before using commands`);
    message.author.send(botembed);
}

module.exports.help = {
  name:("help")
}
