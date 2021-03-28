module.exports = {
    name: 'mute',
    aliases: [],
    permissions: ['MANAGE_ROLES'],
    description: 'Mute members',
    async run(client, args, cmd, message, discord) {
        if (!message.guild.me.hasPermission(['MANAGE_ROLES', 'KICK_MEMBERS'])) return message.channel.send(`I don't have the right permissions!`);
        var toMute = message.mentions.members.first();
        if (!toMute) return message.channel.send('Supply a user to be muted!');
        var reason = args.slice(1).join(' ');
        if (!reason) reason = 'No reason given.';
        var muteRole = message.guild.roles.cache.find(r => r.name === 'Muted');
        if (!muteRole) {
            try {
                muteRole = await message.guild.roles.create({
                    data: {
                        name: 'Muted',
                        color: '#514f48',
                        permissions: []
                    }
                });
            } catch (err) {
                message.channel.send(':exclamation: Failed to create Mute role!');
                console.log(err);
            }
        }
        message.guild.channels.cache.forEach((channel) => {
            channel.updateOverwrite(muteRole, {
                "SEND_MESSAGES": false,
                "ATTACH_FILES": false,
                "SEND_TTS_MESSAGES": false,
                "ADD_REACTIONS": false,
                "SPEAK": false,
                "STREAM": false
            });
        });
        const muteConf = new discord.MessageEmbed()
            .setColor('#0099ff')
            .setDescription(`✅ ${toMute.user.username} has been successfully muted!\nReason: __${reason}__`);
        toMute.roles.add(muteRole.id).then(() => {
            message.delete();
            toMute.send(`You have been muted in **${message.guild.name}** for: **${reason}**`);
            message.channel.send(muteConf);
        });
    }
}
