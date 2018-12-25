const Discord = require("discord.js");
const superagent = require("superagent")


module.exports.run = async (bot, message, args) => {
 
    let {body} = await superagent
    const text = args.join("+");
    .get("https://api.genr8rs.com/Generator/Gaming/Fun/LeetSpeakGenerator?genr8rsUserId=1545723572.85885c21deb4d1ae4&_sText=" + text + "&_sCharacterSet=fancy")
    if(!{body}) return message.channel.send("OOF?! Try again.")
        message.channel.send({body._sResult})

}

module.exports.help = {
    name:"fancy"
  }
