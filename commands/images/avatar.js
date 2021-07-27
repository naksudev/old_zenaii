// Dependencies
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    let member = message.mentions.members.first() || message.member;
    
    let embedavatar = new Discord.MessageEmbed()
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setTitle("URL of the avatar")
        .setURL(member.user.displayAvatarURL({format: "png", dynamic: "true", size: 1024}))
        .setImage(member.user.displayAvatarURL({format: "png", dynamic: "true", size: 1024}))
        .setAuthor(`Avatar of ${member.user.tag}`, member.user.displayAvatarURL())
        .setTimestamp(message.createdAt)
        .setFooter("Zenaii ©", bot.user.displayAvatarURL());
    message.channel.send(embedavatar);
};

module.exports.config = {
    name: "avatar",
    aliases: "",
    description: "Shows the avatar of the mentionned user or yours if not.",
    usage: "[@User]",
    category: "images",
    permission: ["EMBED_LINKS"],
	cooldown: 3
};