// Dependencies
const Discord = require('discord.js');
const dateFormat = require('dateformat');

module.exports.run = async (bot, message, args) => {

    const m = message.mentions.members.first() || message.member;

    if (!m) return message.channel.send(`❓ | You must provide a user.`);

    const statut = {
        online: `${bot.EMOJIS.ONLINE} Online`,
        idle: `${bot.EMOJIS.IDLE} Idle`,
        dnd: `${bot.EMOJIS.DND} Do Not Disturb`,
        offline: `${bot.EMOJIS.OFFLINE} Offline/Invisible`
    };

    // Boolean : Human or bot ?
    let humanorbot;
    if (m.user.bot === true) {
        humanorbot = `🤖`;
    } else {
        humanorbot = `👤`;
    }

    // Badges
    const flags = {
        DISCORD_EMPLOYEE:"<:staff:863519444004241429>",
        PARTNERED_SERVER_OWNER:"<:partner:863519444353679370>",
        HYPESQUAD_EVENTS:"<:hypesquadstars:863519444146585611>",
        BUGHUNTER_LEVEL_1:"<:bug_hunter:863519444231782410>",
        BUGHUNTER_LEVEL_2:"<:bug_hunter_gold:863519444029800468>",
        HOUSE_BRAVERY:"<:bravery:863519444533116938>",
        HOUSE_BRILLIANCE:"<:brilliance:863519444827635723>",
        HOUSE_BALANCE:"<:balance:863519444512800789>",
        EARLY_SUPPORTER:"<:early_supporter:863519444097433621>",
        TEAM_USER:"",
        SYSTEM:"",
        VERIFIED_BOT:"<:verified_bot:867817138706186250>",
        EARLY_VERIFIED_BOT_DEVELOPER:"<:verified_dev:867817138203000853>",
        NITRO:"<:nitro:863519443677610025>"
    };

    const userFlags = m.user.flags.toArray();    

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

    // Embed
    try {
        let userEmbed = new Discord.MessageEmbed()
            .setColor(color)
            .setThumbnail(m.user.displayAvatarURL({ dynamic: true }))
            .setAuthor(`Informations about ${m.user.tag} ${humanorbot}`, bot.user.displayAvatarURL())
            .setTimestamp(message.createdAt)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

        userEmbed.addFields(
            { name: "❯ Nickname", value: `${message.guild.member(m).nickname ? `${message.guild.member(m).nickname}` : `:x:`}`, inline: true},
            { name: "❯ Status", value: `${statut[m.user.presence.status]}`, inline: true},
            { name: "❯ Badges", value: `${userFlags.length ? userFlags.map(flag => flags[flag]).join(' ') : 'No badges.'}`},
            { name: "❯ Activity", value: `${m.presence && m.presence.length ? m.presence.activities[0].name : "Not playing."}`},
            { name: "❯ Creation Date", value: `${dateFormat(m.user.createdAt, "dddd, mmmm dS, yyyy")}`},
            { name: "❯ Joined Date", value: `${dateFormat(m.joinedAt, "dddd, mmmm dS, yyyy")}`},
            { name: `❯ Roles [${m.roles.cache.filter(r => r.id !== message.guild.id).size}]`, value: `${m.roles.cache. filter(r => r.id !== message.guild.id).map(roles => `\`${roles.name}\``).join(", ") || "No roles"}`}
        );

        await message.channel.send(userEmbed);
    } catch (err) {
        console.error(err);
    }
};

module.exports.config = {
    name: "userinfo",
    aliases: ["ui", "userdesc"],
    description: "Shows more informations about the mentionned user.",
    usage: "[@User]",
    category: "misc",
    permission: [],
	cooldown: 2
};
