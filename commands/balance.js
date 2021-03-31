module.exports = {
    name: 'balance',
    aliases: ['bal'],
    permissions: [],
    description: 'Check user balance',
    run(client, args, cmd, message, discord, bP, profileData) {
        const bal = new discord.MessageEmbed()
            .setColor('GREEN')
            .setAuthor(`${message.author.username}'s balance`, message.author.avatarURL())
            .setDescription(`Wallet: **₿${profileData.coins.toLocaleString()}**\nBank: **₿${profileData.bank.toLocaleString()}**`);
        message.channel.send(bal);
    }
}
