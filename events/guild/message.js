require('dotenv').config();
const profileModel = require('../../models/profileSchema');
const PREFIX = process.env.PREFIX;

module.exports = async (Discord, client, message) => {
    // Normal messages with no prefix will run these
    if (message.content === 'wtf')
        return message.channel.send('https://tenor.com/view/wtf-gif-14533740');
    else if (message.author.id === '159985870458322944')
        return message.channel.send('Stfu I\'m cooler than you');

    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    // check if member has a DB profile / create one
    let profileData;
    try {
        profileData = await profileModel.findOne({
            userID: message.author.id
        });
        if (!profileData) {
            let profile = await profileModel.create({
                userID: message.author.id,
                username: message.author.username,
                serverID: message.guild.id,
                coins: 1000,
                bank: 0
            });
            profile.save();
        }
    } catch (err) {
        console.log(err);
    }

    const args = message.content.slice(PREFIX.length).split(/ +/);
    const cmd = args.shift().toLowerCase();

    const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

    // catch invalid commands 
    if (command === undefined) {
        const notCommand = new Discord.MessageEmbed()
            .setColor('RED')
            .setTitle('(╯°□°）╯︵ ┻━┻')
            .setDescription(`:exclamation: \`${PREFIX}${cmd}\` is not a command! Use \`${PREFIX}help\` for avaliable commands!`);
        return message.channel.send(notCommand);
    }

    // checking permissions
    const validPermissions = [
        "CREATE_INSTANT_INVITE",
        "KICK_MEMBERS",
        "BAN_MEMBERS",
        "ADMINISTRATOR",
        "MANAGE_CHANNELS",
        "MANAGE_GUILD",
        "ADD_REACTIONS",
        "VIEW_AUDIT_LOG",
        "PRIORITY_SPEAKER",
        "STREAM",
        "VIEW_CHANNEL",
        "SEND_MESSAGES",
        "SEND_TTS_MESSAGES",
        "MANAGE_MESSAGES",
        "EMBED_LINKS",
        "ATTACH_FILES",
        "READ_MESSAGE_HISTORY",
        "MENTION_EVERYONE",
        "USE_EXTERNAL_EMOJIS",
        "VIEW_GUILD_INSIGHTS",
        "CONNECT",
        "SPEAK",
        "MUTE_MEMBERS",
        "DEAFEN_MEMBERS",
        "MOVE_MEMBERS",
        "USE_VAD",
        "CHANGE_NICKNAME",
        "MANAGE_NICKNAMES",
        "MANAGE_ROLES",
        "MANAGE_WEBHOOKS",
        "MANAGE_EMOJIS",
    ]

    if (command.permissions.length) {
        let invalidPerms = []
        for (const perm of command.permissions) {
            if (!validPermissions.includes(perm)) {
                return console.log(`Invalid Permissions ${perm}`);
            }
            if (!message.member.hasPermission(perm)) {
                invalidPerms.push(perm);
            }
        }
        if (invalidPerms.length) {
            return message.channel.send(`Missing Permissions: \`${invalidPerms}\``);
        }
    }

    try {
        if (command) command.run(client, args, cmd, message, Discord, profileData);
    } catch (err) {
        message.reply('There was an error trying to execute that command! Try again?');
        console.log(err);
    }
}
