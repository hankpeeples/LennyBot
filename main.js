require('dotenv').config();
const mongoose = require('mongoose');

const Discord = require('discord.js');
const client = new Discord.Client();
const TOKEN = process.env.TOKEN;
const MONGODB_SRV = process.env.MONGODB_SRV;

// Make collection for commands and events
client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler => {
    require(`./handlers/${handler}`)(client, Discord);
});

// DB connection
mongoose.connect(MONGODB_SRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log('Database connected!');
}).catch(err => {
    console.log(err);
    console.log('MongoDB failed to connect!');
});

client.login(TOKEN);
