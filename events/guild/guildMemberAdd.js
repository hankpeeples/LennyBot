require('dotenv').config();
const profileModel = require('../../models/profileSchema');
const PREFIX = process.env.PREFIX;

module.exports = async (Discord, client, guildMember) => {
    // create user DB profile
    let profile = await profileModel.create({
        userID: guildMember.id,
        username: message.author.username,
        serverID: guildMember.guild.id,
        coins: 1000,
        bank: 0
    });
    profile.save();
    // welcome role/message
    // let welcomeRole = guildMember.guild.roles.cache.find(role => role.name === 'test');
    // guildMember.roles.add(welcomeRole);
    guildMember.guild.channels.cache.get('623292331214372886').send(`Welcome <@${guildMember.user.id}>! For a list of my commands type **${PREFIX}help** !`);

}
