const {
    utc
} = require('moment');
const package = require('../package.json');
const ms = require('ms');
const {
    uptime
} = require('os');

module.exports = {
    name: 'botinfo',
    aliases: ['binfo', 'bi'],
    permissions: [],
    description: 'Displays bot info',
    run(client, args, cmd, message, discord, bP) {
        const binfo = new discord.MessageEmbed()
            .setColor('YELLOW')
            .setThumbnail(client.user.displayAvatarURL())
            .addField('Bot info', [
                `**${bP} Client:** ${client.user.tag} (${client.user.id})`,
                `**${bP} Commands:** ${client.commands.size}`,
                `**${bP} Servers:** ${client.guilds.cache.size.toLocaleString()}`,
                `**${bP} Users:** ${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}`,
                `**${bP} Avatar:** [Link to avatar](${client.user.displayAvatarURL()})`,
                `**${bP} Creation Date:** ${utc(client.user.createdTimestamp).format('Do MMMM YYYY HH:mm:ss')}`,
                `**${bP} Creator:** <@595507806782619658>`,
                `**${bP} Status:** ${client.user.presence.status}`,
                `\u200b`,
                `**${bP} Code:** [Link](${package.repository.url})`,
                `**${bP} Version:** v${package.version}`,
                `**${bP} Node.js:** v${package.engines.node}`,
                `**${bP} Discord.js:** v${package.dependencies['discord.js']}`,
                `**${bP} Uptime:** ${ms(uptime(), { long: true })}`
            ])
            .setTimestamp(new Date())
            .setFooter(`Info requested by ${message.author.username}`, message.author.avatarURL());
        message.channel.send(binfo);
    }
}
