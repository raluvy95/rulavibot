const Discord = require('discord.js');
const fortnite = require('fortnitetracker-7days-stats');

module.exports.run = (client, message, args) => {
    if(args.length < 2){
        message.channel.send(":x: Correct: `$fortnite pc (Kullanıcı Adı)` ");
        return;
    }

    var name = "";
    for(var i = 1; i < args.length; i++){
        name += args[i] + " ";
    }
    name = name.trim(); // remove last space

    var url = "https://fortnitetracker.com/profile/pc/"
                                + encodeURIComponent(name);
    message.channel.startTyping();

    fortnite.getStats(name, "pc", (err, result) => {
        if(err){
            message.channel.send(":x: User Name Incorrect!");
            message.channel.stopTyping();
            return;
        }
      
        var embed = new Discord.RichEmbed()
            .setAuthor(result.accountName, "", url)
            .setDescription('')
            .addField("Wins", result.wins)
            .addField("Matches", result.matches)
            .addField("Win Rate", ~~result.wr + "%")
            .addField("Kills", + result.kills)
            .addField("K/D", + result.kd)
            .setColor("#9b00ff")
            .setURL(url)
            .setThumbnail(result.skinUrl);

        message.channel.stopTyping();
        message.channel.send(embed);
    });
};


module.exports.help = {
  name: 'fortnite',
};
