require('dotenv').config();
const fetch = require('node-fetch');
const {
    MessageEmbed
} = require('discord.js');
const NASA_API = process.env.NASA_API;

module.exports = {
    name: 'apod',
    aliases: ['apod'],
    permissions: [],
    description: "Show the Astronomy Picture of the Day from NASA API",
    async run(client, args, cmd, message) {
        fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API}`).then(res => {
            return res.json();
        }).then(apod => {
            const apodEmbed = new MessageEmbed()
                .setColor('BLUE')
                .setTitle('🚀 NASA Astronomy Picture of the Day 📷')
                .setDescription(`${apod.date} \n **${apod.title}**`)
                .setImage(apod.url)
                .setTimestamp(new Date())
                .setFooter("© Timmy's Brain", "https://cdn.discordapp.com/avatars/595507806782619658/270520317e83454379f18cea01fa76bc.png?size=2048");
            message.channel.send(apodEmbed);
        });
    }
}
