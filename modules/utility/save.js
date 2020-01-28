module.exports = {
  name: "save",
  module: "utility",
  description: "Save your GD to the database",
  execute: async (message, args, gd, client) => {
    let arg = args.join(" ")
    if(!arg) return message.channel.send("Please use `v!save <your GD username>`")
    let check = await gd.api.users.getByNick(arg)
    if(!check) return message.channel.send("It looks like your GD username is invalid")
    client.db.set(message.author.id, {gd: arg})
    return message.channel.send("Saved! Now you can use `v!profile` without any params!")
  }
};
