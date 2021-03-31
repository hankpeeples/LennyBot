const {
    utc
} = require('moment');
const package = require('../package.json');
const ms = require('ms');
const os = require('os');

module.exports = {
    name: 'botinfo',
    aliases: ['binfo', 'bi'],
    permissions: [],
    description: 'Displays bot info',
    run(client, args, cmd, message, discord) {
        const core = os.cpus()[0];
        const binfo = new discord.MessageEmbed()
            .setColor('YELLOW')
            .setThumbnail(client.user.displayAvatarURL())
            .addField('Bot info', [
                `**» Client:** ${client.user.tag} (${client.user.id})`,
                `**» Commands:** ${client.commands.size}`,
                `**» Servers:** ${client.guilds.cache.size.toLocaleString()}`,
                `**» Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
                `**» Avatar:** [Link to avatar](${client.user.displayAvatarURL()})`,
                `**» Creation Date:** ${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
                `**» Creator:** <@595507806782619658>`,
                `**» Status:** ${client.user.presence.status}`,
                `**» Code:** [Link](${package.repository.url})`,
                `**» Version:** v${package.version}`,
                `**» Node.js:** v${package.engines.node}`,
                `**» Discord.js:** v${package.dependencies['discord.js']}`,
                `\u200b`
            ])
            .addField('System', [
                `**» Uptime:** ${ms(os.uptime() * 1000, { long: true })}`,
                `**» CPU:**`,
                `\u3000 Cores: ${os.cpus().length}`,
                `\u3000 Model: ${core.model}`,
                `\u3000 Speed: ${core.speed}MHz`
            ])
            .setTimestamp(new Date())
            .setFooter(`Info requested by ${message.author.username}`, message.author.avatarURL());
        message.channel.send(binfo);
    }
}
