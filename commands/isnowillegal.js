const Discord = require("discord.js");
const illegalize = require('isnowillegal');

module.exports.run = async (bot, message, args) => {

let boi = args.join('');
illegalize(boi).then(url => {
    message.channel.send(url);
});

}

module.exports.help = {
    name:"illegal"
  }
