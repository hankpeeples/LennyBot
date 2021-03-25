require('dotenv').config();
const fetch = require('node-fetch');
const {
    MessageEmbed
} = require('discord.js');
const WEATHER_API = process.env.WEATHER_API;
const PREFIX = process.env.PREFIX;

module.exports = {
    name: 'weather',
    aliases: ['weather'],
    description: "Gives you weather for desired location",
    async run(client, args, cmd, message) {
        var city = args.join(' ');
        if (!city) return message.reply(`No city was given. Please follow format: '**${PREFIX}weather city**'`);

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${WEATHER_API}`).then(res => {
            return res.json();
        }).then(weather => {
            if (weather.cod == '404')
                return message.reply(`${city} does not exist or there is no info available.`);

            var date = new Date(weather.dt * 1000).toLocaleDateString();
            const weatherEmbed = new MessageEmbed()
                .setColor('#64dfdf')
                .setAuthor('Courtesy of OpenWeatherMap')
                .setTitle(`🌞 Weather for ${weather.name}`)
                .setDescription(`**${weather.sys.country} -- ${date}**`)
                .setThumbnail(client.user.avatarURL('png'))
                .addField(
                    '⛅ Forecast',
                    `${weather.weather[0].main} || ${weather.weather[0].description}`)
                .addField(
                    '🌡️ Temperature',
                    `${(Math.round(((weather.main.temp - 273.15) * 9 / 5 + 32)))}° F`, true)
                .addField(
                    'Feels like ',
                    `${(Math.round(((weather.main.feels_like - 273.15) * 9 / 5 + 32)))}° F`, true)
                .addField(
                    '💧 Humidity',
                    `${weather.main.humidity}%`)
                .addField(
                    '🌬️ Wind Speed',
                    `${weather.wind.speed} mph`)
                .setTimestamp(new Date())
                .setFooter("© Henry's Brain", "https://cdn.discordapp.com/avatars/595507806782619658/270520317e83454379f18cea01fa76bc.png?size=2048");
            message.channel.send(weatherEmbed);
        });
    }
}
