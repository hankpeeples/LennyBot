module.exports = {
   name: 'unmute',
   description: 'Unmutes a server member',
   excecute(msg, args) {
      const target = msg.mentions.users.first();
      // check if user has permission to use command
      if (msg.member.roles.cache.has('811142977673232385')) {
         // make sure target exists
         if (target) {
            let mainRole = msg.guild.roles.cache.find(role => role.name === 'test');
            let muteRole = msg.guild.roles.cache.find(role => role.name === 'mute');

            // target info
            let memberTarget = msg.guild.members.cache.get(target.id);

            // manual unmute
            memberTarget.roles.remove(muteRole.id);
            memberTarget.roles.add(mainRole.id);

            msg.channel.send(`<@${memberTarget.user.id}> has been unmuted.`);
         } else {
            msg.reply('Can\'t find that member!');
         }
      } else {
         msg.reply('You do not have permission to use this command!');
      }
   }
}
