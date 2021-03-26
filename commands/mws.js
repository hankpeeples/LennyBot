require('dotenv').config();
const fetch = require('node-fetch');
const {
    MessageEmbed
} = require('discord.js');
const NASA_API = process.env.NASA_API;

module.exports = {
    name: 'mws',
    aliases: ['mws', 'marsweather'],
    description: "Mars weather service",
    async run(client, args, cmd, message) {
        // get current date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;

        fetch(`https://api.nasa.gov/insight_weather/?api_key=${NASA_API}&feedtype=json&ver=1.0`).then(res => {
            return res.json();
        }).then(data => {
            // find most recent data
            var count = 0;
            var i = 0;
            while (data.sol_keys[i] != null) {
                count++;
                i++;
            }
            var marsWeather = data[Object.keys(data)[count - 1]];
            // date looks like 2021-03-22T21:30:25Z | get date as 2021-03-22
            var date = marsWeather.Last_UTC.substr(0, 10);
            var atmos_pressure = Math.round((marsWeather.PRE.mx / 6895) * 100) / 100;
            const marsEmbed = new MessageEmbed()
                .setColor('RED')
                .setAuthor('Thanks to NASA\'s InSight Mars lander!')
                .setTitle(`🔭 Mars 'Weather' `)
                .setDescription(`Most recent data : ${date}\n\n**Note:** I converted the atmospheric pressure data from Pa (Pascal Units) to psi. For reference, Earth's atmospheric pressure is 14.7 psi.\n`)
                .addField('Northern Season', marsWeather.Northern_season, true)
                .addField('Southern Season', marsWeather.Southern_season, true)
                .addField('Overall Season', marsWeather.Season, true)
                .addField('Atmospheric Pressure', `${atmos_pressure} psi`, true)
                .addField('Nerd Note:', `The lower the planets atmospheric pressure is, the less oxygen there is to breath. So this ${atmos_pressure} psi is why we can\'t breath on Mars without space suits :slight_smile:`)
                .setTimestamp(new Date())
                .setFooter("© Timmy's Brain", "https://cdn.discordapp.com/avatars/595507806782619658/270520317e83454379f18cea01fa76bc.png?size=2048");
            message.channel.send(marsEmbed);
        }).catch(err => {
            message.channel.send('🔭 Error fetching Mars Weather!');
            throw err;
        });;
    }
}
