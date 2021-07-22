// Dependencies
const Discord = require('discord.js');
const get = require("node-fetch"); 

module.exports.run = async (bot, message, args) => {
    const fox = await get("https://randomfox.ca/floof/")
        .then(res => res.json())
        .then(json => json.image);

    const embed = new Discord.MessageEmbed()
        .setImage(fox)
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setAuthor(`🐶 | Here is a random dog for ${message.author.tag} !`)
        .setTimestamp(message.createdAt)
        .setFooter("Zenaii © Powered by https://randomfox.ca/floof/", bot.user.displayAvatarURL());
    message.channel.send({embed});  
};

module.exports.help = {
	name: "fox",
	aliases: ["floof"],
	description: "Shows a random pic of foxies.",
    usage: "",
	category: "images",
};

module.exports.config = {
	permission: "",
	cooldown: 3,
};