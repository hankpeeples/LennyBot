require('dotenv').config();
const PREFIX = process.env.PREFIX;

module.exports = (Discord, client, message) => {
    // Personal preference, just shows every message in the terminal 
    // with some colors.
    console.log("\n-----------------------------");
    console.log(`User: \x1b[35m${message.author.username}`, "\x1b[0m");
    console.log(`Server: ${message.guild.name}`);
    console.log(`Channel: ${message.channel.name}`);
    console.log(`Message: \x1b[36m"${message.content}"`, "\x1b[0m");
    console.log("-----------------------------");

    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    try {
        if (command) command.run(client, args, cmd, message, Discord);
    } catch (err) {
        message.reply('There was an error trying to execute the command!');
        console.log(err);
    }
}