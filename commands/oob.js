module.exports = {
    name: 'oob',
    aliases: ['oob'],
    description: "Swap vowels with 'oob'",
    async run(client, args, cmd, message) {
        // Could use args but this seems easier
        var oobStr = message.content.slice(4).trim();
        message.reply(oobStr.replace(/[aeiou]/gi, 'oob'));
    }
}
