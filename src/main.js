require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const TOKEN = process.env.TOKEN;
const prefix = '#';
const memberCounter = require('../counters/member_counter');

// Make collection for commands
client.commands = new Discord.Collection();
// make sure files being read are strictly .js files
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
// use for loop to find correct file for given command
for (const file of commandFiles) {
   const command = require(`../commands/${file}`);
   client.commands.set(command.name, command);
}

client.on('ready', () => {
   console.log("\x1b[31m%s\x1b[0m", `\n${client.user.tag} is now online!`);
   client.user.setActivity('with Lenny', {
      type: "PLAYING"
   });
   memberCounter(client);
});

// Simple new member message
client.on('guildMemberAdd', guildMember => {
   let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'test');
   guildMember.roles.add(welcomeRole);
   guildMember.guild.channels.cache.get('706588663747969107').send(`Welcome <@${guildMember.user.id}>! For a list of my commands type **${prefix}help**!`);
});

client.on('message', msg => {

   // Personal preference, just shows every message in the terminal 
   // with some colors.
   console.log("\n-----------------------------");
   console.log(`User: \x1b[35m${msg.author.username}`, "\x1b[0m");
   console.log(`Server: ${msg.guild.name}`);
   console.log(`Channel: ${msg.channel.name}`);
   console.log(`Message: \x1b[36m"${msg.content}"`, "\x1b[0m");
   console.log("-----------------------------");

   if (!msg.content.startsWith(prefix) || msg.author.bot) return;

   const args = msg.content.slice(prefix.length).split(/ +/);
   const command = args.shift().toLowerCase();

   if (command === 'clear') {
      client.commands.get('clear').run(msg, args);
   } else if (command === '8ball') {
      client.commands.get('eightBall').run(msg, args);
   }
});

client.login(TOKEN);
