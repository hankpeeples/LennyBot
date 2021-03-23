// counts number of server members every 5 minutes and adds the number to the voice channel name
module.exports = async (bot) => {
   // guild
   const guild = bot.guilds.cache.get('706588663747969104');
   setInterval(() => {
      const memberCount = guild.memberCount;
      // get voice channel
      const channel = guild.channels.cache.get('823757139523928094');
      channel.setName(`Total Members: ${memberCount.toLocaleString()}`);
      console.log('Updating member count');
   }, 300000);
}
