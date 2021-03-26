module.exports = {
    name: 'vcban',
    aliases: ['vckick'],
    description: "Ban someone from current voice channel",
    async run(client, args, cmd, message) {
        if (!args[0]) return message.reply('You need to @ the user!');
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) return message.reply('You need to be in a channel to execute this command!');
        console.log(message.member.voice.channel);
        const userBaned = args[0].substr(3, 18);

        voiceChannel.members.forEach(member => {
            if (member.user.id === userBaned) {
                member.voice.channel.join();
                member.guild.voiceStates.cache.forEach(member => {
                    if (member.id === userBaned) {

                    }
                });
            }
        });
    }
}
