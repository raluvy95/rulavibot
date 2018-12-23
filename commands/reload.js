const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = (bot, message, args) => {

    if (message.author.id !== "390540063609454593") return message.channel.send("⛔ **ACCESS DENIED**");

    try {
        delete require.cache[require.resolve(`./${args[0]}.js`)];
    } catch (e) {

        return message.channel.send(`Unable to reload: ${args[0]}.js`);
    }

    message.channel.send(`**Successfully reloaded:** ${args[0]}.js`);


}

module.exports.help = {
  name:("reload")
}
