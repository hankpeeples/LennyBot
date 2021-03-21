module.exports = {
    name: 'clear',
    description: "Clear specified number of chat messages.",
    async excecute(msg, args) {
        // if no number was given
        if (!args[0]) {
            return msg.reply('Please enter the amount of messages you want to clear.');
        }
        // check if given value is a number
        if (isNaN(args[0])) {
            return msg.reply('Please enter a numerical value.');
        }
        // maximize how many can be deleted at once
        if (args[0] > 100) {
            return msg.reply('Cannot deleted more than 100 messages!');
        }
        // less than 1
        if (args[0] < 1) {
            return msg.reply('Must delete at least one message!');
        }
        // clear messages
        await msg.channel.messages.fetch({
            limit: args[0]
        }).then(messages => {
            msg.channel.bulkDelete(messages);
        });
    }
}
