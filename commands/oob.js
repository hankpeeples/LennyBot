module.exports = {
    name: 'oob',
    aliases: ['oob'],
    permissions: [],
    description: "Swap vowels with 'oob'",
    async run(client, args, cmd, message) {
        var oob_str = args.join(' ');
        message.reply(oob_str.replace(/[aeiou]/gi, 'oob'));
    }
}
