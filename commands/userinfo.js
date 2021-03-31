const moment = require('moment');

module.exports = {
    name: 'userinfo',
    aliases: ['info', 'ui'],
    permissions: [],
    description: 'Displays user info',
    run(client, args, cmd, message, discord, bP) {
        const member = message.mentions.members.last() || message.member;
        const roles = member.roles.cache.sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);

        const info = new discord.MessageEmbed()
            .setColor('YELLOW')
            .setThumbnail(member.user.displayAvatarURL({
                dynamic: true,
                size: 512
            }))
            .addField('User', [
                `**${bP} Username:** ${member.user.username}`,
                `**${bP} Discriminator:** ${member.user.discriminator}`,
                `**${bP} ID:** ${member.id}`,
                `**${bP} Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
                `**${bP} Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
                `**${bP} Status:** ${member.user.presence.status}`,
                `**${bP} Game:** ${member.user.presence.game || 'Not playing a game.'}`,
                `\u200b`
            ])
            .addField('Member', [
                `**${bP} Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
                `**${bP} Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
                `**${bP} Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
                `**${bP} Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
                `\u200b`
            ])
            .setTimestamp(new Date())
            .setFooter(`Info requested by ${message.author.username}`, message.author.avatarURL());
        message.channel.send(info);
    }
}
