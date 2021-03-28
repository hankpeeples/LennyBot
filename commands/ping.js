module.exports = {
    name: 'ping',
    aliases: [],
    permissions: [],
    description: 'Provides bot server ping',
    async run(client, args, cmd, message, discord) {
        const msg = await message.channel.send('Pinging...');

        const latency = msg.createdTimestamp - message.createdTimestamp;

        msg.edit(`My ping to this server - Bot Latency: **${latency}ms**, API Latency: **${Math.round(client.ws.ping)}ms**`);
    }
}
