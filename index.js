const Discord = require("discord.js")
const gmd = require("geometry-dash-api")
const client = new Discord.Client({disableEveryone: true})
const fs = require("fs")
const db = require("quick.db")
client.db = new db.table("save")
client.commands = new Discord.Collection()
const cooldowns = new Discord.Collection()
const gd = new gmd({
  server: 'http://v0ltgdmprsv.7m.pl/database/', 
  userName: 'CatNowBlue',
  password: process.env.PASSWORD
});
gd.login()
const modules = fs
    .readdirSync(`./modules/`)
    .filter(
      file =>
        
        !file.startsWith("_")
    );
for (const m of modules) {
  const commandFiles = fs.readdirSync(`./modules/${m}/`).filter(file => file.endsWith(".js") && !file.startsWith("_"))
  console.log(`Module: ${m}`)
  for (const file of commandFiles) {
    const command = require(`./modules/${m}/${file}`);
    client.commands.set(command.name, command);
    console.log(`${file} loaded!`);
  }
}

client.on('ready', async () => {
  console.log("READY!")
  client.user.setActivity("Geometry Dash || v!help")
})
client.on("message", message => {
  if (message.channel.type != "text") return;
  let prefix = "v!"
  if (!message.content.startsWith(prefix) || message.author.bot) return;
  const args = message.content.slice(prefix.length).split(/ +/);
  const commandName = args.shift().toLowerCase();
  const command =
    client.commands.get(commandName) ||
    client.commands.find(
      cmd => cmd.aliases && cmd.aliases.includes(commandName)
    );
  if (!command) return;
  if (command.ownerOnly && message.author.id != 390540063609454593)
    return message.reply("This command is Owner Only!");
  if(command.serverOwner && message.author.id != 419506072332664834) return message.reply("That commands is Server Owner only!")
  if (command.hidden) return;
  if (command.permission && !message.member.hasPermission(command.permission))
    return message.channel.send(
      `You don't have any permission to execute the command\nYou need: ${command.permission.join(
        ", "
      )}`
    );
  if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }
  const now = Date.now();
  const timestamps = cooldowns.get(command.name);
  const cooldownAmount = (command.cooldown || 3) * 1000;
  if (timestamps.has(message.author.id)) {
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      return message.reply(
        `Please wait ${timeLeft.toFixed(
          1
        )} more second(s) before reusing the \`${command.name}\` command.`
      );
    }
  }
  timestamps.set(message.author.id, now);
  setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

  try {
    command.execute(message, args, gd, client);
  } catch (error) {
    console.error(error);
    let e = !message.author.id == 390540063609454593 ? "" : error;
    message.reply("there was an error trying to execute that command!\n" + e);
  }
});
client.login(process.env.SECRET)