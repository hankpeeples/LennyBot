// counts number of server members every 5 minutes and adds the number to the voice channel name
module.exports = async (client) => {
    // guild
    const guild = client.guilds.cache.get('623292331214372884');
    setInterval(() => {
        const memberCount = guild.memberCount;
        // get voice channel
        const channel = guild.channels.cache.get('825870943771164673');
        channel.setName(`Total Members: ${memberCount.toLocaleString()}`);
        console.log('Updating member count');
    }, 300000);
}
