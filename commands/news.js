require('dotenv').config();
const fetch = require('node-fetch');
const KEY = process.env.NEWS;

module.exports = {
    name: 'news',
    aliases: [],
    permissions: [],
    description: 'Pulls current news',
    run(client, args, cmd, message, discord) {
        if (!args[0]) {
            fetch(`https://api.currentsapi.services/v1/latest-news?apiKey=${KEY}`).then(res => {
                return res.json();
            }).then(news => {
                const info = news.news[0];
                const current = new discord.MessageEmbed()
                    .setColor('RED')
                    .setAuthor(`Author: ${info.author}, Published on ${info.published.substr(0, 10)}`)
                    .setTitle(`Top News`)
                    .setURL(info.url)
                    .setDescription(`**${info.title}**`)
                    .addField('Content 📰', `${info.description} | **Click link at the top for full article!**`)
                    .setImage(info.image)
                    .setTimestamp(new Date())
                    .setFooter(`News requested by ${message.author.username}`, message.author.avatarURL());
                return message.channel.send(current);
            }).catch(err => {
                message.channel.send(':exclamation: Error receiving news!');
                throw err;
            });
        } else {
            const keyword = args.join(' ');

            fetch(`https://api.currentsapi.services/v1/search?keywords=${keyword}&apiKey=${KEY}`).then(res => {
                return res.json();
            }).then(news => {
                const info = news.news[0];
                console.log(info);
                const search = new discord.MessageEmbed()
                    .setColor('RED')
                    .setAuthor(`Author: ${info.author}, Published on ${info.published}`)
                    .setTitle(`Top News result for "${keyword}"`)
                    .setURL(info.url)
                    .setDescription(`**${info.title}**`)
                    .addField('Content 📰', `${info.description} | **Click link at the top for full article!**`)
                    .setImage(info.image)
                    .setTimestamp(new Date())
                    .setFooter(`News requested by ${message.author.username}`, message.author.avatarURL());
                return message.channel.send(search);
            }).catch(err => {
                message.channel.send(':exclamation: Error receiving news!');
                throw err;
            });
        }
    }
}
