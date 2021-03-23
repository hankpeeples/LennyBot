require('dotenv').config();

const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;

// Make collection for commands and events
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

client.login(TOKEN);
