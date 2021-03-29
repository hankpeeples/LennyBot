const memberCounter = require('../../counters/member_counter');

module.exports = (Discord, client) => {
    console.log(`\nLenny is online!`);
    setInterval(changeStatus, 240000); // change every 4 minutes
    memberCounter(client);

    function changeStatus() {
        console.log("\nChanging status!");
        const status = [
            "with your feelings",
            "with perry ;)",
            "with griffen :(",
            "with gabriel :|",
            "with henry :P",
            "with lenny (ツ)",
            "with hunter ᕕ( ᐛ )ᕗ"
        ];
        let randomStatus = status[Math.floor(Math.random() * status.length)];
        client.user.setActivity(randomStatus, {
            type: "PLAYING"
        }).catch(err => {
            console.log(err, 'Failed to set activity!');
        });
    }
}
