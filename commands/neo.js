require('dotenv').config();
const fetch = require('node-fetch');
const {
    MessageEmbed
} = require('discord.js');
const NASA_API = process.env.NASA_API;

module.exports = {
    name: 'neo',
    aliases: ['neo'],
    permissions: [],
    description: "Near Earth Object",
    async run(client, args, cmd, message) {
        // get current date
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today = yyyy + '-' + mm + '-' + dd;
        fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API}`).then(res => {
            return res.json();
        }).then(data => {
            var neo = data.near_earth_objects[Object.keys(data.near_earth_objects)[0]];
            var count = 0;
            var potHaz = 2;
            // search for potentially hazardous == true
            for (var i = 0; i < data.element_count; i++) {
                if (neo[i].is_potentially_hazardous_asteroid) {
                    potHaz = i;
                    count++;
                    console.log('Found a potentially hazardous asteroid!');
                }
            }
            if (potHaz === 0 || potHaz === 1) {
                potHaz = 2;
            }
            // round to 2 decimal places
            const neoD1 = Math.round(neo[0].close_approach_data[0].miss_distance.miles * 100) / 100;
            const neoD2 = Math.round(neo[1].close_approach_data[0].miss_distance.miles * 100) / 100;
            const neoD3 = Math.round(neo[potHaz].close_approach_data[0].miss_distance.miles * 100) / 100;
            // embed
            const neoEmbed = new MessageEmbed()
                .setColor('BLUE')
                .setTitle(':rock: Today\'s Near Earth Objects (NEO)')
                .setDescription(`There are **${data.element_count}** NEO's today! I am only showing **3** of them, sorry!\n\n:exclamation: **${count}** potentially hazardous NEO's! :exclamation:`)
                .addField('Asteroid Name', neo[0].name, true)
                .addField('Distance from Earth (miles)', neoD1, true)
                .addField('Potentially Hazardous', neo[0].is_potentially_hazardous_asteroid, true)
                .addField('Asteroid Name', neo[1].name, true)
                .addField('Distance from Earth (miles)', neoD2, true)
                .addField('Potentially Hazardous', neo[1].is_potentially_hazardous_asteroid, true)
                .addField('Asteroid Name', neo[potHaz].name, true)
                .addField('Distance from Earth (miles)', neoD3, true)
                .addField('Potentially Hazardous', neo[potHaz].is_potentially_hazardous_asteroid, true)
                .setTimestamp(new Date())
                .setFooter("© Timmy's Brain", "https://cdn.discordapp.com/avatars/595507806782619658/270520317e83454379f18cea01fa76bc.png?size=2048");
            message.channel.send(neoEmbed);
        }).catch(err => {
            message.channel.send('☄️ Error fetching Near Earth Objects!');
            throw err;
        });
    }
}
