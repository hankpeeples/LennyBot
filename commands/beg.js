const profileModel = require('../models/profileSchema');

module.exports = {
    name: 'beg',
    aliases: [],
    permissions: [],
    description: 'Beg for coins',
    async run(client, args, cmd, message, Discord, bP, profileData) {
        const randomNumber = Math.floor(Math.random() * 500) + 1;
        const response = await profileModel.findOneAndUpdate({
            userID: message.author.id
        }, {
            $inc: {
                coins: randomNumber
            }
        });

        const beg = new Discord.MessageEmbed()
            .setColor('GREEN')
            .setAuthor(`${message.author.username}'s a beggar!`, message.author.avatarURL())
            .setDescription(`Received: **₿${randomNumber}** coins`);
        return message.channel.send(beg);
    }
}
