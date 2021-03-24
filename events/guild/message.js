module.exports = (Discord, client, message) => {
    const prefix = '#';

    // Personal preference, just shows every message in the terminal 
    // with some colors.
    console.log("\n-----------------------------");
    console.log(`User: \x1b[35m${message.author.username}`, "\x1b[0m");
    console.log(`Server: ${message.guild.name}`);
    console.log(`Channel: ${message.channel.name}`);
    console.log(`Message: \x1b[36m"${message.content}"`, "\x1b[0m");
    console.log("-----------------------------");

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd);

    if (command) command.run(client, args, message, Discord);
}
