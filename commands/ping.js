module.exports = {
	name: 'ping',
	description: "This reply's with 'pong' to a 'ping' message",
	excecute(msg, args) {
		// code for command
		msg.channel.send('pong!');
	}
}
