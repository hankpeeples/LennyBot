require('dotenv').config();
const fetch = require('node-fetch');
const WEATHER_API = process.env.WEATHER_API;
const PREFIX = process.env.PREFIX;

module.exports = {
    name: 'weather',
    aliases: ['weather'],
    permissions: [],
    description: "Gives you weather for desired location",
    async run(client, args, cmd, message, discord, bP) {
        var city = args.join(' ');
        if (!city) return message.reply(`No city was given. Please follow format: '**${PREFIX}weather city**'`);

        fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${WEATHER_API}`).then(res => {
            return res.json();
        }).then(weather => {
            if (weather.cod == '404')
                return message.reply(`${city} is not a valid city or there is no info available.`);

            var date = new Date(weather.dt * 1000).toLocaleDateString();
            const weatherEmbed = new discord.MessageEmbed()
                .setColor('#64dfdf')
                .setTitle(`🌞 Weather for ${weather.name}, ${weather.sys.country}`)
                .setDescription(`**${date}**`)
                .addField(
                    '⛅', [
                        `**${bP} Current :** ${weather.weather[0].main}`,
                        `**${bP} 🌡️ Temp :** ${(Math.round(((weather.main.temp - 273.15) * 9 / 5 + 32)))}° F`,
                        `**${bP} Feels like :** ${(Math.round(((weather.main.feels_like - 273.15) * 9 / 5 + 32)))}° F`,
                        `**${bP} 💧 Humidity :** ${weather.main.humidity}%`,
                        `**${bP} 🌬️ Wind Speed :** ${weather.wind.speed} mph`,
                    ])
                .setTimestamp(new Date())
                .setFooter(`Weather requested by ${message.author.username}`, message.author.avatarURL());
            message.channel.send(weatherEmbed);
        });
    }
}
