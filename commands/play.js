const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

// create queue map
const queue = new Map();

module.exports = {
    name: 'play',
    aliases: ['p', 'play', 'minecraft'],
    description: 'play music from youtube',
    async run(client, args, cmd, message, Discord) {
        const voice_channel = message.member.voice.channel;
        if (!voice_channel) return message.reply('You need to be in a voice channel to use this command!');

        // get user permissions
        const permissions = voice_channel.permissionsFor(message.client.user);
        // not allowed to connect to vc
        if (!permissions.has('CONNECT')) return message.reply('You don\'t have the correct permissions!');
        if (!permissions.has('SPEAK')) return message.reply('You don\'t have the correct permissions!');

        const server_queue = queue.get(message.guild.id);

        if (cmd === 'play') {
            if (!args.length) return message.reply('You need to give me a song to search!');
            let song = {};

            // check if args is link or keywords
            if (ytdl.validateURL(args[0])) {
                const song_info = await ytdl.getInfo(args[0]);
                song = {
                    title: song_info.videoDetails.title,
                    url: song_info.videoDetails.url
                }
            } else {
                // if not URL use keywords
                const video_finder = async (query) => {
                    const video_result = await ytSearch(query);
                    // if more than one result get the first one
                    return (video_result.videos.length > 1) ? video_result.videos[0] : null;
                }

                const video = await video_finder(args.join(' '));
                if (video) {
                    song = {
                        title: video.title,
                        url: video.url
                    }
                } else {
                    message.reply('Error finding video.');
                }
            }
            // if no server queue yet
            if (!server_queue) {
                const queue_constructor = {
                    voice_channel: voice_channel,
                    text_channel: message.channel,
                    connection: null,
                    songs: []
                }
                queue.set(message.guild.id, queue_constructor);
                queue_constructor.songs.push(song);

                try {
                    const connection = await voice_channel.join();
                    queue_constructor.connection = connection;
                    // play songs
                    video_player(message.guild, queue_constructor.songs[0]);
                } catch (err) {
                    queue.delete(message.guild.id);
                    message.channel.send('I am having trouble connecting!');
                    throw err;
                }
            } else {
                // if there is a server queue already
                server_queue.songs.push(song);
                return message.channel.send(`:thumbsup: **${song.title}** added to the queue!`);
            }
        } else if (cmd === 'skip') skip_song(message, server_queue);
        else if (cmd === 'stop') stop_song(message, server_queue);
    }
}

const video_player = async (guild, song) => {
    const song_queue = queue.get(guild.id);
    // if queue is empty
    if (!song) {
        song_queue.voice_channel.leave();
        queue.delete(guild.id);
        return;
    }

    const stream = ytdl(song.url, {
        filter: 'audioonly'
    });

    song_queue.connection.play(stream, {
        seek: 0,
        volume: 0.5
    }).on('finish', () => {
        song_queue.songs.shift();
        video_player(guild, song_queue.songs[0]);
    });

    await song_queue.text_channel.send(`:musical_note: Now playing **${song.title}**`);
}

const skip_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.reply('You need to be in a voice channel to use this command!');
    if (!server_queue) {
        return message.reply('There are no songs in the queue!');
    }
    server_queue.connection.dispatcher.end();
}

const stop_song = (message, server_queue) => {
    if (!message.member.voice.channel) return message.reply('You need to be in a voice channel to use this command!');
    server_queue.songs = [];
    server_queue.connection.dispatcher.end();
}