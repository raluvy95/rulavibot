const shop = require("./../../_shop.json")

module.exports = {
  name: "buy",
  module: "economy",
  description: "Buy from a server shop",
  execute: (message, args, gd, client) => {
    
    let emoji = {
      0: "<:orbs:671353665638105134>",
      1: "<:diamond:670717315834183690>"
    };
    
    let id = args[0]
    if(!id) return message.channel.send("Please use `v!buy <ID> [almount]`")
    let almount = args.slice(1)[0]
    if(!almount) almount = 1
    if(isNaN(almount)) return message.channel.send("The 'almount' param must be number.")
    let bought = shop.find(m => m.id == id)
    if(!bought) return message.channel.send("That ID is not found in shop.")
    let fetch = client.db.get(message.author.id)
    if(!fetch) return message.channel.send("It looks like you cannot buy with an emply orbs/diamonds")
    if(bought.costtype == 0) {
      if(!fetch.orbs) return message.channel.send("It looks like you cannot buy with an emply orbs/diamonds")
      if(fetch.orbs < bought.cost * almount) return message.channel.send("You don't have any orbs for that!")
      else {
        client.db.subtract(`${message.author.id}.orbs`, bought.cost * almount)
        client.db.add(`${message.author.id}.diamonds`, 1 * almount)
        return message.channel.send(`You bought **x${almount} ${bought.item}** which costs in total ${emoji[bought.costtype]} **${bought.cost * almount}**\nAnd you got **${almount + " diamond"}** !`)
      }
    } else {
      if(!fetch.diamonds) return message.channel.send("You can't buy with an emply orbs/diamonds!")
      if(fetch.orbs < bought.cost * almount) return message.channel.send("You don't have any diamonds for that!")
      if(fetch.icons) {
        if(fetch.icons.includes(bought.rewards.icon)) return message.channel.send("You already bought that icon!")
      }
      else {
        client.db.subtract(`${message.author.id}.diamonds`, bought.cost * almount)
        client.db.push(`${message.author.id}.icons`, bought.rewards.icon)
        return message.channel.send(`You bought **x${almount} ${bought.item}** which costs in total ${emoji[bought.costtype]} **${bought.cost * almount}**\nAnd you got **${bought.rewards.icon ? "a cube: " + bought.rewards.icon : "nothing"}** !`)
      }
    }
  }
}