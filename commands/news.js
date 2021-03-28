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
                // not the best way to do this but whatever
                if (info.image === 'None') {
                    const current = new discord.MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`Author: ${info.author}, Published on ${info.published.substr(0, 10)}`)
                        .setTitle(`Top News ℹ️ \n\n${info.title}`)
                        .setDescription(`[**_Link to article_**](${info.url})`)
                        .addField('Content 📰', `${info.description}`)
                        .setTimestamp(new Date())
                        .setFooter(`News requested by ${message.author.username}`, message.author.avatarURL());
                    return message.channel.send(current);
                } else {
                    const current = new discord.MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`Author: ${info.author}, Published on ${info.published.substr(0, 10)}`)
                        .setTitle(`Top News ℹ️ \n\n${info.title}`)
                        .setDescription(`[**_Link to article_**](${info.url})`)
                        .addField('Content 📰', `${info.description}`)
                        .setImage(info.image)
                        .setTimestamp(new Date())
                        .setFooter(`News requested by ${message.author.username}`, message.author.avatarURL());
                    return message.channel.send(current);
                }
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
                if (info.image === 'None') {
                    const search = new discord.MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`Author: ${info.author}, Published on ${info.published.substr(0, 10)}`)
                        .setTitle(`Top News result for "${keyword}" ℹ️ \n\n${info.title}`)
                        .setDescription(`[**_Link to article_**](${info.url})`)
                        .addField('Content 📰', `${info.description}`)
                        .setTimestamp(new Date())
                        .setFooter(`News requested by ${message.author.username}`, message.author.avatarURL());
                    return message.channel.send(search);
                } else {
                    const search = new discord.MessageEmbed()
                        .setColor('RED')
                        .setAuthor(`Author: ${info.author}, Published on ${info.published.substr(0, 10)}`)
                        .setTitle(`Top News result for "${keyword}" ℹ️ \n\n${info.title}`)
                        .setDescription(`[**_Link to article_**](${info.url})`)
                        .addField('Content 📰', `${info.description}`)
                        .setImage(info.image)
                        .setTimestamp(new Date())
                        .setFooter(`News requested by ${message.author.username}`, message.author.avatarURL());
                    return message.channel.send(search);
                }
            }).catch(err => {
                message.channel.send(':exclamation: Error receiving news!');
                throw err;
            });
        }
    }
}
