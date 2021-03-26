const insult = require('insult-compliment');

module.exports = {
    name: 'insult',
    aliases: ['insult'],
    permissions: [],
    description: "Insults you",
    async run(client, args, cmd, message) {
        message.reply(insult.Insult());
    }
}
