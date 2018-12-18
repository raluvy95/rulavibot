const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!user)
    return message.channel.send("**Tag a user to run this command!**")
    if(user === bot.user)
    return message.channel.send(`* kill ${author.user.name} *`)
    var answers = [`${user} died`, `${user} tried to outrun a train, the train won.`, `${user} died an honorable death. Death by snoo snoo.`, `${user} died eating expired and infected raw fish with the filthiest rice in the world as sushi while being constantly stabbed in the scrotum with a 9inch nail sharp enough to stab through kevlar. The soy sauce was cat piss.`,
`${user} is sucked into Minecraft. ${user}, being a noob at the so called Real-Life Minecraft faces the Game Over screen.`, `Alt+F4'd ${user}.exe!`, `${user} is abducted by aliens, and the government kills them to cover it up.`, `${user} died from not eating enough ass.`, `${user} died of oversucc`, `${user} died from whacking it too much. (There's a healthy balance, boys)`,
`${user} dies from posting normie memes.`, `${user} disappeared from the universe.`, `${user} dies from bad succ.`];

    var answer = answers[Math.floor(Math.random() * answers.length)];
    
    message.channel.send(answer);
    }
  
module.exports.help = {
    name:"kill"
  }