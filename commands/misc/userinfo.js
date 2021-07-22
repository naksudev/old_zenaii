// Dependencies
const Discord = require('discord.js');
const dateFormat = require('dateformat');

module.exports.run = async (bot, message, args) => {

    const m = message.mentions.members.first() || message.member;

    if (!m) return message.channel.send(`❓ | You must provide a user.`);

    const statut = {
        online: `${bot.emojis.resolve(bot.EMOJIS.online)} Online`,
        idle: `${bot.emojis.resolve(bot.EMOJIS.idle)} Idle`,
        dnd: `${bot.emojis.resolve(bot.EMOJIS.dnd)} Do Not Disturb`,
        offline: `${bot.emojis.resolve(bot.EMOJIS.offline)} Offline/Invisible`
    };

    // Boolean : Human or bot ?
    let humanorbot;
    if (m.user.bot === true) {
        humanorbot = `🤖`;
    } else {
        humanorbot = `👤`;
    }

    // Switch : if <color> then color variable = the new color.
    let color;
    switch (m.user.presence.status) {
        case 'online':
            color = '#00ff44';
            break;
        case 'idle':
            color = '#ffc400';
            break;
        case 'dnd':
            color = '#ff0000';
            break;
        case 'offline':
            color = '#b8b8b8';
            break;
        default: 
            color = Math.floor(Math.random() * 16777214) + 1;
    }

    try {
        // Embed
        let userEmbed = new Discord.MessageEmbed()
            .setColor(color)
            .setThumbnail(m.user.displayAvatarURL())
            .setAuthor(`Informations about ${m.user.tag} ${humanorbot}`, bot.user.displayAvatarURL())
            .setTimestamp(message.createdAt)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

        userEmbed.addFields(
            { name: "❯ Nickname", value: `${message.guild.member(m).nickname ? `${message.guild.member(m).nickname}` : `:x:`}`, inline: true},
            { name: "❯ Status", value: `${statut[m.user.presence.status]}`, inline: true},
            { name: "❯ Creation Date", value: `${dateFormat(m.user.createdAt, "dddd, mmmm dS, yyyy")}`},
            { name: "❯ Joined Date", value: `${dateFormat(m.joinedAt, "dddd, mmmm dS, yyyy")}`},
            { name: `❯ Roles [${m.roles.cache.filter(r => r.id !== message.guild.id).size}]`, value: `${m.roles.cache. filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(", ") || "No roles"}`}
        );

        await message.channel.send(userEmbed);
    } catch (err) {
        console.error(err);
    }
};

module.exports.help = {
    name: "userinfo",
    aliases: ["ui", "userdesc"],
    description: "Shows more informations about the mentionned user.",
    usage: "[@User]",
    category: "misc",
};

module.exports.config = {
	permission: "",
	cooldown: 2,
};