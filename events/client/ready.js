const memberCounter = require('../../counters/member_counter');

module.exports = (Discord, client) => {
    console.log("\x1b[31m%s\x1b[0m", `\nLenny is online!`);
    client.user.setActivity('with Lenny', {
        type: "PLAYING"
    });
    memberCounter(client);
}
