// Dependencies
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("BAN_MEMBERS")) return;

    message.guild.fetchBans()
        .then(banned => {
            let list = banned.map(e => `**${e.user.tag}** (${e.user.id})\nReason : ${e.reason}`).join('\n ');

            let embed = new Discord.MessageEmbed()
                .setColor(Math.floor(Math.random() * 16777214) + 1)
                .setAuthor(`List of the banned users [${banned.size}]`, bot.user.displayAvatarURL())
                .setDescription(`${!list ? `\`No one is banned.\`` : `${list}`}`)
                .setTimestamp(message.createdAt)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
            message.channel.send(embed);
        })
        .catch(console.error);

};

module.exports.config = {
    name: "banlist",
    aliases: "",
    description: "Lists all the users banned from the server.",
    usage: "",
    category: "moderation",
    permission: ["BAN_MEMBERS"],
    cooldown: 0
};