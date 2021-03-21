module.exports = {
	name: 'youtube',
	description: "sends youtube link",
	excecute(msg, args) {
		// code for command
		if (msg.member.roles.cache.has('822331403323965471')) {
			msg.channel.send('https://youtube.com');
			// remove role from user
			msg.member.roles.remove('822331403323965471').catch(console.error);
		} else {
			msg.reply('I see you do not have the correct permissions, let me change that :) now try!');
			// add needed role to user
			msg.member.roles.add('822331403323965471').catch(console.error);
		}
	}
}
