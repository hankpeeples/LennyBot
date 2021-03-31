require('dotenv').config();
const PRE = process.env.PREFIX;

module.exports = {
    name: 'help',
    aliases: [''],
    permissions: [],
    description: 'Shows avaliable commands and usage',
    run(client, args, cmd, message, discord, bP) {
        if (!args[0]) {
            const help = new discord.MessageEmbed()
                .setColor('#e2703a')
                .setAuthor(`${client.user.username}`, client.user.avatarURL())
                .setURL('https://github.com/hankpeeples/LennyBot')
                .setTitle('Lenny\'s commands!')
                .setThumbnail(client.user.avatarURL())
                .addField('Commands', [
                    `**${bP} ${PRE}oob <words>**`,
                    `**${bP} ${PRE}insult**`,
                    `**${bP} ${PRE}clear <amount>**`,
                    `**${bP} ${PRE}meme**`,
                    `**${bP} ${PRE}mws**`,
                    `**${bP} ${PRE}neo**`,
                    `**${bP} ${PRE}apod**`,
                    `**${bP} ${PRE}8ball <question>**`,
                    `**${bP} ${PRE}weather <city>**`,
                    `**${bP} ${PRE}botinfo**`
                ], true)
                .addField('Commands', [
                    `**${bP} ${PRE}suggest <suggestion>** Use \`${PRE}help suggest\` for more info.`,
                    `**${bP} ${PRE}play <song>** ❗ Does not work atm!`,
                    `**${bP} Economy:** Use \`${PRE}help econ\` for more info!`,
                    `**${bP} ${PRE}userinfo <@user>** User optional.`,
                    `**${bP} ${PRE}news <keyword>** Keyword optional.`,
                    `**${bP} ${PRE}mute <@user>**`,
                    `**${bP} ${PRE}unmute <@user>**`,
                    `**${bP} ${PRE}ping**`
                ], true)
                .setTimestamp(new Date())
                .setFooter(`Help requested by ${message.author.username}`, message.author.avatarURL());
            message.channel.send(help);
        } else if (args[0] === 'econ') {
            const helpEcon = new discord.MessageEmbed()
                .setColor('#e2703a')
                .setAuthor(`${client.user.username}`, client.user.avatarURL())
                .setURL('https://github.com/hankpeeples/LennyBot')
                .setTitle('Economy system')
                .setThumbnail(client.user.avatarURL())
                .addField('Economy System Commands:', [
                    `**${bP} ${PRE}bal :** Shows your balance. Everyone starts with **₿1000** coins.`,
                    `**${bP} ${PRE}beg :** Gives you a random number of coins from 0 - 500.`,
                    `**${bP} ${PRE}coinflip <heads, tails> <bet amount> :** Flips heads or tails, If you win you receive 2x your bet amount.`,
                    `**${bP} ${PRE}dep <amount> :** Deposits amount from wallet into your bank.`,
                    `**${bP} ${PRE}wd <amount> :** Withdraws amount from bank into your wallet.`,
                    `\u200b`,
                    `I set up a database for this system so all coins will still be in your account even if the bot shuts off. I might add some 'items' you can purchase with the coins soon since this is lowkey pointless without something to buy.`
                ])
                .setTimestamp(new Date())
                .setFooter(`Help requested by ${message.author.username}`, message.author.avatarURL());
            message.channel.send(helpEcon);
        } else if (args[0] === 'suggest') {
            const helpSugg = new discord.MessageEmbed()
                .setColor('#e2703a')
                .setAuthor(`${client.user.username}`, client.user.avatarURL())
                .setURL('https://github.com/hankpeeples/LennyBot')
                .setTitle('Suggest system')
                .setThumbnail(client.user.avatarURL())
                .addField('Suggest system usage:', [
                    `**${bP} ${PRE}suggest <suggestion> :** Use this if you have an idea for a useful command I can add. \nIt will delete your message from whatever channel you typed it in and send an 'embed' (thats what this is) to the 'bot-suggestions' channel. \nIt will then add some reactions to the message so people can vote if they want the suggested command or not. \nAlthough there are no promises I can successefully make the command you want, sometimes I'm dumb.`
                ])
                .setTimestamp(new Date())
                .setFooter(`Help requested by ${message.author.username}`, message.author.avatarURL());
            message.channel.send(helpSugg);
        }
    }
}
