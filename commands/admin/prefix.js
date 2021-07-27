// Dependencies
const Discord = require("discord.js");

module.exports.run = async (bot, message, args, settings) => {

    if (!message.member.hasPermission("ADMINISTRATOR", true, true)) return;

    // Check if the args is the same as in the DB
    if (args[0] === settings.prefix) return message.channel.send(`:x: | You are already using this prefix.`);

    // Change prefix and update to DB
    if (args[0]) {
        await bot.updateGuild(message.guild, { prefix : args[0] });
        let prefixChanged = new Discord.MessageEmbed()
            .setColor("#ff0049")
            .setAuthor(`${bot.user.username}`, bot.user.displayAvatarURL())
            .setTitle(`The prefix of **\`${message.guild.name}\`** is now **\`${args[0]}\`**`)
            .setTimestamp(message.createdAt)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
        message.channel.send(prefixChanged);
    } else return message.channel.send(`:x: | You need to put at least one character to change the prefix. ${message.author}`);
};

module.exports.config = {
    name: "prefix",
    aliases: ["setprefix"],
    description: "Changes the prefix of the bot.",
    usage: "<character>",
    category: "admin",
    permission: [],
    cooldown: 5
};