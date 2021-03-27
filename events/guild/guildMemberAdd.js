require('dotenv').config();
const PREFIX = process.env.PREFIX;

module.exports = (Discord, client, guildMember) => {
    let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'test');
    guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('706588663747969107').send(`Welcome <@${guildMember.user.id}>! For a list of my commands type **${PREFIX}help**!`);
}
