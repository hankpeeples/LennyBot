require('dotenv').config();

const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require('fs');


const TOKEN = process.env.TOKEN;
const prefix = '!';
// Make collection for commands
bot.commands = new Discord.Collection();
// make sure files being read are strictly .js files
const commandFiles = fs.readdirSync('./commands')
	.filter(file => file.endsWith('.js'));
// use for loop to find correct file for given command
for (const file of commandFiles) {
	const command = require(`../commands/${file}`);

	bot.commands.set(command.name, command);
}

bot.on('ready', () => {
	console.log("\x1b[31m%s\x1b[0m", `\n${bot.user.tag} is now online!`);
	bot.user.setActivity('with Lenny', {
		type: "PLAYING"
	});
});

bot.on('message', msg => {

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

	if (command === 'ping') {
		bot.commands.get('ping').excecute(msg, args);
	} else if (command === 'youtube') {
		bot.commands.get('youtube').excecute(msg, args);
	}
});

bot.login(TOKEN);
