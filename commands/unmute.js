module.exports = {
    name: 'unmute',
    aliases: [],
    permissions: ['MANAGE_ROLES', 'ADMINISTRATOR'],
    description: 'Unmute members',
    async run(client, args, cmd, message, discord) {
        if (!message.guild.me.hasPermission(['MANAGE_ROLES', 'KICK_MEMBERS'])) return message.channel.send(`I don't have the right permissions!`);
        var toUnmute = message.mentions.members.first();
        if (!toUnmute) return message.channel.send('Supply a user to be unmuted!');
        var muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');
        const unmuteConfirm = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setDescription(`✅ ${toUnmute.user.username} has been successfully unmuted!`);
        toUnmute.roles.remove(muteRole.id).then(() => {
            message.delete()
            toUnmute.send(`You have been unmuted in **${message.guild.name}**`)
            message.channel.send(unmuteConfirm)
        });
    }
}
