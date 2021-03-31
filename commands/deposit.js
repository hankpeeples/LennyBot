const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'deposit',
    aliases: ['dep'],
    permissions: [],
    description: 'Deposit coins into your bank',
    async run(client, args, cmd, message, Discord, bP, profileData) {
        const amount = args[0];
        // make sure args isnt floating point num or negative
        if (amount % 1 != 0 || amount <= 0) return message.reply('Deposit amount must be a whole number!');
        try {
            if (amount > profileData.coins) return message.reply('You don\'t have that amount of coins to deposit!');
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, {
                $inc: {
                    coins: -amount,
                    bank: amount
                }
            });
            return message.reply(`Successefully deposited **₿${amount.toLocaleString()} coins** to your bank!`);
        } catch (err) {
            message.reply(':exclamation: Something went wrong! Try again?');
            console.log(err);
        }
    }
}
