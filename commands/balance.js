module.exports = {
    name: 'balance',
    aliases: ['bal'],
    permissions: [],
    description: 'Check user balance',
    run(client, args, cmd, message, Discord, profileData) {
        const bal = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setAuthor(`${message.author.username}'s balance`, message.author.avatarURL())
            .setDescription(`Wallet: **₿${profileData.coins.toLocaleString()}**\nBank: **₿${profileData.bank.toLocaleString()}**`);
        message.channel.send(bal);
    }
}
