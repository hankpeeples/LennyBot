const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'withdraw',
    aliases: ['wd'],
    permissions: [],
    description: 'Withdraw coins from your bank',
    async run(client, args, cmd, message, Discord, profileData) {
        const amount = args[0];
        // make sure args isnt floating point num or negative
        if (amount % 1 != 0 || amount <= 0) return message.reply('Withdraw amount must be a whole number!');
        try {
            if (amount > profileData.bank) return message.reply('You don\'t have that amount of coins to withdraw!');
            await profileModel.findOneAndUpdate({
                userID: message.author.id
            }, {
                $inc: {
                    coins: amount,
                    bank: -amount
                }
            });
            return message.reply(`Successefully withdrew **₿${amount.toLocaleString()} coins** to your wallet!`);
        } catch (err) {
            message.reply(':exclamation: Something went wrong! Try again?');
            console.log(err);
        }
    }
}
