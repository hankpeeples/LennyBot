const util = require('minecraft-server-util');

module.exports = {
    name: 'mcserver',
    description: 'get info about a minecraft server',
    run(client, args, message, Discord) {
        if (!args[0]) return message.reply('Enter a minecraft server IP');
        if (!args[1]) return message.reply('Enter the port for the MC server. Default is 25565');

        util.status(args[0], {
            port: parseInt(args[1])
        }).then((response) => {
            const embed = new Discord.MessageEmbed()
                .setColor('#BFCDE8')
                .setTitle('Mc server status')
                .setThumbnail(client.user.avatarURL('png'))
                .addFields({
                    name: 'Server IP',
                    value: response.host
                }, {
                    name: 'Online Players',
                    value: response.onlinePlayers.toLocaleString()
                }, {
                    name: 'Max Players',
                    value: response.maxPlayers.toLocaleString()
                }, {
                    name: 'Server Version',
                    value: response.version
                })
                .setTimestamp(new Date())
                .setFooter("© Henry's Brain", "https://cdn.discordapp.com/avatars/595507806782619658/270520317e83454379f18cea01fa76bc.png?size=2048");

            message.channel.send(embed);
        }).catch((error) => {
            message.reply('There was an error finding this server! Make sure you typed everything correctly or try another server.');
            throw error;
        });
    }
}
