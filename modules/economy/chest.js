const chance = require("chance");
const random = new chance();

module.exports = {
  name: "chest",
  module: "economy",
  description: "Open a chest and gets some orbs!",
  cooldown: 30 * 60,
  execute: (message, args, gd, client) => {
    let emoji = {
      0: "<:orbs:671353665638105134>",
      1: "<:diamond:670717315834183690>"
    };
    message.channel.send("<:close:671669501561143338> Opening a chest...").then(m => {
      let random1 = random.integer({ min: 500, max: 5000 });
      let random2 = random.integer({ min: 1, max: 10 });
      setTimeout(() => {
        m.edit(
          `<:open:671669477921914892> You got ${emoji[0]} **${random1}** and ${emoji[1]} **${random2}** !`
        ).then(op => {
          client.db.add(`${message.author.id}.orbs`, random1);
          client.db.add(`${message.author.id}.diamonds`, random2);
        });
      }, 3000);
    });
  }
};
