const {
   MessageEmbed
} = require('discord.js');

module.exports = {
   name: 'eightBall',
   description: 'Asks a question and let the bot determine your fate :sparkler:',
   async execute(msg, args) {
      // return if no question is asked
      if (!args[0]) return msg.channel.send('Please ask a full question!');
      // random responses
      const replies = ['Yes.', 'No.', 'Never.', 'Definitely.', 'Ask again later.'];
      // Get a random respons for the array
      const result = Math.floor(Math.random() * replies.length);
      // join the args(Array<string>) to a question string
      const question = args.join(' ');
      // check permissions for embed
      if (msg.channel.permissionsFor(msg.guild.me).has('EMBED_LINKS')) {
         const embed = new MessageEmbed()
            .setAuthor('🎱 The 8 Ball says...')
            .setColor('ORANGE').addField('Question:', question)
            .addField('Answer:', replies[result]);
         await msg.channel.send(embed);
      } else {
         // no permissins so bot will default to a raw message
         await msg.channel.send(`**Question:**\n${question}\n**Answer:**\n${replies[result]}`);
      }
   },
};
