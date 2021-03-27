require('dotenv').config();
const PRE = process.env.PREFIX;

module.exports = {
    name: 'help',
    aliases: [''],
    permissions: [],
    description: 'Shows avaliable commands and usage',
    run(client, args, cmd, message, discord) {
        const help = new discord.MessageEmbed()
            .setColor('BLACK')
            .setAuthor(`${client.user.username} ---- The emojies are just there for some color`, client.user.avatarURL(), 'https://github.com/hankpeeples/LennyBot')
            .setTitle('Lenny\'s commands!')
            .setThumbnail(client.user.avatarURL())
            .addField(`${PRE}oob <words> ⚕️`, "\_Replaces all vowels in '<words>' with 'oob'\_", true)
            .addField(`${PRE}insult ⚜️`, '\_Insults you, thats it.\_', true)
            .addField(`${PRE}clear <amount> 📛`, "\_Clears '<amount>' number of chat messages.\_", true)
            .addField(`${PRE}meme 🔰`, '\_Pulls a (hopefully) funny meme from reddit.\_', true)
            .addField(`${PRE}mws 〽️`, '\_Shows Mars \'Weather\'.\_', true)
            .addField(`${PRE}neo ➰`, '\_Shows the Near Earth Objects of the day.\_', true)
            .addField(`${PRE}apod 🔱`, '\_Shows the NASA Astronomy Picture of the Day.\_', true)
            .addField(`${PRE}8Ball <question> ❇️`, '\_Eight Ball answers question.\_', true)
            .addField(`${PRE}play <song or yt link> ❗`, '\_Doesn\'t fully work yet.\_', true)
            .addField(`${PRE}suggest <suggestion> ✴️`, '\_Sends your suggestion to the \'bot-suggestions\' channel. This makes it easier for you to give me suggestions for other commands/actions.\_', true)
            .addField(`${PRE}weather <city> 🆒`, '\_Shows weather for desired \'<city>\'.\_', true)
            .setTimestamp(new Date())
            .setFooter(`Help requested by ${message.author.username}`, message.author.avatarURL());
        message.channel.send(help);
    }
}
