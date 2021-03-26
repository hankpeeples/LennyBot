module.exports = {
    name: 'suggestions',
    aliases: ['suggest', 'suggestion'],
    permissions: [],
    description: 'creates a suggestion',
    run(client, args, cmd, message, discord) {
        const channel = message.guild.channels.cache.find(c => c.name === 'suggestions');
        if (!channel) return message.channel.send('Suggestions channel does not exist!');

        let messageArgs = args.join(' ');
        // create embed
        const embed = new discord.MessageEmbed()
            .setColor('#FADF2E')
            .setAuthor(message.author.tag, message.author.displayAvatarURL({
                dynamic: true
            }))
            .setDescription(messageArgs)
        channel.send(embed).then((msg) => {
            msg.react('👍');
            msg.react('👎');
            message.delete();
        }).catch((err) => {
            channel.send(':exclamation: Error! Try again?');
            throw err;
        });
    }
}
