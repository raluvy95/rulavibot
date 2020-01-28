const {RichEmbed} = require("discord.js")
const chance = require("chance")
module.exports  = {
  name: "playlevel",
  description: "Similar to GD, but playing on Discord",
  cooldown: 30,
  module: "fun",
  usage: "v!playlevel <level ID on GDPS>",
  execute: async (message, args, gd, client) => {
    const c = new chance()
  let arg = args.join(" ")
  if(!arg) return message.channel.send("What level you want to play? Use `v!playlevel <level ID>`")
  if(isNaN(arg)) return message.channel.send("That's not an ID lol")
  let a = await gd.api.levels.getById({ levelID: arg, levelString: true });
  if(!a) return message.channel.send("That level is not found.")
  let fetch = client.db.get(message.author.id)
  if(!fetch) fetch = {skill: 0}
  if(!fetch.skill) fetch = {skill: 0}
   let chances = {
     NA: 80,
     Auto: 100,
    Easy: 50,
     Normal: 45,
     Hard: 40,
     Harder: 35,
     Insane: 30,
     EasyDemon: 20,
     MediumDemon: 15,
     HardDemon: 10,
     InsaneDemon: 5,
     ExtremeDemon: 3
    }
  let e = new RichEmbed()
  .setAuthor(message.author.tag, message.author.avatarURL)
  .setThumbnail(message.author.avatarURL)
  .setColor("RANDOM")
  .setTimestamp()
  .setDescription(`${message.author.username} is playing **${a.name}** (${a.diff}) using his/her skill: **${fetch.skill}%`)
  message.channel.send(e).then(m => { setTimeout(() => {
    const ch = c.integer({min: chances[a.diff], max: 100})
    let win = fetch.skill * chances[a.diff] + 1 / 20
    if(Math.floor(win) >= ch) {
      e.setDescription(`🎉 **GG!**\n${message.author.username} just beat the level **${a.name}**! Congrats!\nYour skill inceased with **1%**!`)
      client.db.add(`${message.author.id}.skill`, 1)
     return  m.edit(e)
    } else {
      e.setDescription(`😓 **Can't beat!**\n${message.author.username} just raged quit because he/she cannot beat the level after some attemps\nYour skill inceased with **0.2%**!`)
      client.db.add(`${message.author.id}.skill`, 0.2)
     return m.edit(e)
    }}, 5000)
  })
}
}