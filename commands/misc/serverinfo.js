// Dependencies
const Discord = require('discord.js');
var dateFormat = require('dateformat');
// Json files
const verifLevels = require(`../../assets/verifLevels.json`);
const region = require(`../../assets/regions.json`);

module.exports.run = async (bot, message, args, settings) => {

    const emojiList = message.guild.emojis.cache.map(e => `${e}`);
    const verifiedemoji = bot.emojis.resolve(bot.EMOJIS.verified); // TODO: Change the emojis IDs

    let serverdesc =  new Discord.MessageEmbed()
        .setAuthor(`${message.guild.name} ${message.guild.verified ? `${verifiedemoji}` : " "}`, message.guild.iconURL())
        .setDescription(`ID: ${message.guild.id} \nVerification level: ${verifLevels[message.guild.verificationLevel]}`)
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setThumbnail(message.guild.iconURL())
        .setTimestamp(message.createdAt)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());

    serverdesc.addFields(
        { name: "❯ Owner", value: `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, inline: true },
        { name: "❯ Region", value: region[message.guild.region], inline: true },
        { name: "❯ Members", value: `Total: ${message.guild.memberCount} \nHuman: ${message.guild.members.cache.filter(member => !member.user.bot).size} \nBots: ${message.guild.members.cache.filter(member => member.user.bot).size}`, inline: false },
        { name: "❯ Channels", value: `Categories: ${message.guild.channels.cache.filter(channel => channel.type === 'category').size} \nText Channels: ${message.guild.channels.cache.filter(channel => channel.type === 'text').size} \nVoice Channels: ${message.guild.channels.cache.filter(channel => channel.type === 'voice').size}`, inline: false },
        { name: "❯ Creation Date", value: dateFormat(message.guild.createdAt, "dddd, mmmm dS, yyyy"), inline: false },
    );

    // If the member has the permission "Administrator" then add the category.
    if (message.member.hasPermission("ADMINISTRATOR")) {
        serverdesc.addField(`❯ Roles [${message.guild.roles.cache.size}]`, `${message.guild.roles.cache.size > 8 ? `\`Too many. Do ${settings.prefix}roles to see them.\`` : `${message.guild.roles.cache.fetch(roles => `\`${roles.name}\``).join(', ')}`}`, true);
    }

    if (message.guild.emojis.cache.size > 1) {
        serverdesc.addField(`❯ Emojis [${message.guild.emojis.cache.size}]`, `${message.guild.emojis.cache.size > 10 ? `\`Too many. Do ${settings.prefix}emojis to see them.\`` : `${emojiList.join("")}`}`);
    }
    
    message.channel.send(serverdesc);
};

module.exports.help = {
	name: "serverinfo",
	aliases: ["si", "serverdesc"],
	description: "Shows more informations about the current guild.",
    usage: "",
	category: "misc",
};

module.exports.config = {
	permission: "",
	cooldown: 2,
};