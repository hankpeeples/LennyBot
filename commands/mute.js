const ms = require('ms');

module.exports = {
    name: 'mute',
    description: 'Essentially mute a server member',
    excecute(msg, args) {
        const target = msg.mentions.users.first();
        // make sure target exists
        if (target) {
            let mainRole = msg.guild.roles.cache.find(role => role.name === 'test');
            let muteRole = msg.guild.roles.cache.find(role => role.name === 'mute');

            // target info
            let memberTarget = msg.guild.members.cache.get(target.id);

            if (!args[1]) {
                // manual mute
                memberTarget.roles.remove(mainRole.id);
                memberTarget.roles.add(muteRole.id);
                msg.channel.send(`<@${memberTarget.user.id}> has been muted.`);
                return;
            }
            memberTarget.roles.remove(mainRole.id);
            memberTarget.roles.add(muteRole.id);
            msg.channel.send(`<@${memberTarget.user.id}> has been muted for ${ms(ms(args[1]))}.`);

            // Function will crash bot if it doesn't get numerical input
            setTimeout(function () {
                memberTarget.roles.remove(muteRole.id);
                memberTarget.roles.add(mainRole.id);
            }, ms(args[1]));

        } else {
            msg.reply('Can\'t find that member!');
        }
    }
}
