const moment = require('moment');

module.exports = {
    name: 'userinfo',
    aliases: ['info', 'ui'],
    permissions: [],
    description: 'Displays user info',
    run(client, args, cmd, message, discord) {
        const member = message.mentions.members.last() || message.member;
        console.log("» MEMBER\n", member);
        const roles = member.roles.cache.sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);
        console.log("» ROLES\n", roles);

        const info = new discord.MessageEmbed()
            .setColor('YELLOW')
            .setThumbnail(member.user.displayAvatarURL({
                dynamic: true,
                size: 512
            }))
            .addField('User', [
                `**» Username:** ${member.user.username}`,
                `**» Discriminator:** ${member.user.discriminator}`,
                `**» ID:** ${member.id}`,
                `**» Avatar:** [Link to avatar](${member.user.displayAvatarURL({ dynamic: true })})`,
                `**» Time Created:** ${moment(member.user.createdTimestamp).format('LT')} ${moment(member.user.createdTimestamp).format('LL')} ${moment(member.user.createdTimestamp).fromNow()}`,
                `**» Status:** ${member.user.presence.status}`,
                `**» Game:** ${member.user.presence.game || 'Not playing a game.'}`,
                `\u200b`
            ])
            .addField('Member', [
                `**» Highest Role:** ${member.roles.highest.id === message.guild.id ? 'None' : member.roles.highest.name}`,
                `**» Server Join Date:** ${moment(member.joinedAt).format('LL LTS')}`,
                `**» Hoist Role:** ${member.roles.hoist ? member.roles.hoist.name : 'None'}`,
                `**» Roles [${roles.length}]:** ${roles.length < 10 ? roles.join(', ') : roles.length > 10 ? this.client.utils.trimArray(roles) : 'None'}`,
                `\u200b`
            ])
            .setTimestamp(new Date())
            .setFooter(`Info requested by ${message.author.username}`, message.author.avatarURL());
        message.channel.send(info);
    }
}
