module.exports = {
    name: 'clear',
    aliases: ['clear'],
    permissions: ["ADMINISTRATOR", "MANAGE_MESSAGES"],
    description: "Clear specified number of chat messages.",
    async run(client, args, cmd, message) {
        // if no number was given
        if (!args[0]) {
            return message.reply('Please enter the amount of messages you want to clear.');
        }
        // check if given value is a number
        if (isNaN(args[0])) {
            return message.reply('Please enter a numerical value.');
        }
        // maximize how many can be deleted at once
        if (args[0] > 100) {
            return message.reply('Cannot deleted more than 100 messages!');
        }
        // less than 1
        if (args[0] < 1) {
            return message.reply('Must delete at least one message!');
        }
        // clear messages
        await message.channel.messages.fetch({
            limit: args[0]
        }).then(messages => {
            message.channel.bulkDelete(messages);
        });
    }
}
