const {
    meme
} = require('memejs');
const {
    MessageEmbed
} = require('discord.js');

module.exports = {
    name: 'meme',
    aliases: ['meme pls'],
    permissions: [],
    description: "Grab meme from reddit",
    async run(client, args, cmd, message) {
        message.channel.send('Getting your meme... :thought_balloon:');
        const sub = 'terriblefacebookmemes';
        meme(sub).then(meme => {
            const memeEmbed = new MessageEmbed()
                .setColor('#845ec2')
                .setAuthor(`r/${meme.subreddit}`)
                .setURL(meme.url)
                .setTitle(meme.title)
                .setImage(meme.url);
            message.channel.send(memeEmbed);
        }).catch(err => {
            message.channel.send(':exclamation: Sometimes it fucks up, we all have our days...try again :exclamation:');
            throw err;
        });
    }
}
