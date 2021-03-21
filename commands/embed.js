module.exports = {
   name: 'embed',
   description: "Embeds!",
   excecute(msg, args, Discord) {
      const embed = new Discord.MessageEmbed()
         .setColor('#304281')
         .setTitle('Rules')
         .setURL('https://github.com/hankpeeples')
         .setDescription('Embed for server rules.')
         .addFields({
            name: 'Rule 1',
            value: 'Be nice.'
         }, {
            name: 'Rule 2',
            value: 'Don\'t be cunt'
         });

      msg.channel.send(embed);
   }
}
