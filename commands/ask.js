const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    var answers = [
    'Maybe.', 'Lol no.', 'I really hope so.', 'Not in your wildest dreams.',
    'There is a good chance.', 'Quite likely.', 'I think so.', 'I hope not.',
    'I hope so.', 'Wtf no!', 'Fuhgeddaboudit.', 'Ahaha! Really?!?', 'Pfft.',
    'Sorry, bby.', 'fuck, yes.', 'Hell to the no.', 'ehhhhhh, i dont know.',
    'The future is uncertain.', 'I would rather not say.', 'Who cares?',
    'Possibly.', 'Never, ever, ever.', 'There is a small chance.', 'Yes!'];
    var answer = answers[Math.floor(Math.random() * answers.length)];
    
    message.channel.send(`**${answer}**`);
    }
  
module.exports.help = {
    name:"ask"
  }

