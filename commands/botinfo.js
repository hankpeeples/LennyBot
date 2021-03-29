const {
    utc
} = require('moment');

module.exports = {
    name: 'botinfo',
    aliases: ['binfo', 'bi'],
    permissions: [],
    description: 'Displays bot info',
    run(client, args, cmd, message, discord) {
        const binfo = new discord.MessageEmbed()
            .setColor('YELLOW')
            .setThumbnail(client.user.displayAvatarURL())
            .addField('Bot info', [
                `**» Client:** ${client.user.tag} (${client.user.id})`,
                `**» Commands:** ${client.commands.size}`,
                `**» Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
                `**» Avatar:** [Link to avatar](${client.user.displayAvatarURL()})`,
                `**» Creation Date:** ${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
                `**» Creator:** <@595507806782619658>`,
                `**» Status:** ${client.user.presence.status}`,
                `**» Code:** [Link](https://github.com/hankpeeples/LennyBot)`,
                `\u200b`
            ])
            .setTimestamp(new Date())
            .setFooter(`Info requested by ${message.author.username}`, message.author.avatarURL());
        message.channel.send(binfo);
    }
}
