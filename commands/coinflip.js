const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'coinflip',
    aliases: ['flip', 'cf'],
    permissions: [],
    description: 'Gamble your coins with a coin flip',
    async run(client, args, cmd, message, Discord, profileData) {
        const coinPick = args[0].toUpperCase();
        const amount = args[1];
        const amountDoubled = amount * 2;
        // make sure args isnt floating point num or negative
        if (amount % 1 != 0 || amount <= 0) return message.reply('Amount must be a whole number!');
        if (amount > profileData.coins) return message.reply(`You don't have that many coins in your wallet to gamble!`);
        const coin = ['HEADS', 'TAILS'];
        const rand = Math.round(Math.random() * 1) + 1;

        var flip = coin[rand - 1];

        try {
            if (coinPick === flip) {
                await profileModel.findOneAndUpdate({
                    userID: message.author.id
                }, {
                    $inc: {
                        coins: amountDoubled
                    }
                });
                const win = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setAuthor(`${message.author.username}'s coin flip`, message.author.avatarURL())
                    .setDescription(`Your bet: **₿${amount}** on **${coinPick}**
                    Flipped: **${flip}**
                    \nYou **Won ₿${amountDoubled}** coins!`);
                return message.channel.send(win);
            } else {
                await profileModel.findOneAndUpdate({
                    userID: message.author.id
                }, {
                    $inc: {
                        coins: -amount
                    }
                });
                const lose = new Discord.MessageEmbed()
                    .setColor('GREEN')
                    .setAuthor(`${message.author.username}'s coin flip`, message.author.avatarURL())
                    .setDescription(`Your bet: **₿${amount}** on **${coinPick}**
                    Flipped: **${flip}**
                    \nYou **Lost ₿${amount}** coins! Better luck next time!`);
                return message.channel.send(lose);
            }
        } catch (err) {
            message.reply(':exclamation: Something went wrong! Try again?');
            console.log(err);
        }
    }
}
