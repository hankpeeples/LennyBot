module.exports = {
    name: 'youtube',
    description: "sends youtube link",
    excecute(msg, args) {
        // code for command
        msg.channel.send('https://youtube.com');
    }
}
