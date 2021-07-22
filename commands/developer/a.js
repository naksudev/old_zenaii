// Dependencies
const Discord = require('discord.js');
const { MessageButton } = require("discord-buttons");

module.exports.run = async (bot, message, args, settings) => {
	
	const embed = new Discord.MessageEmbed()
        .setTitle("Testing Discord-Buttons")
        .setColor("BLUE");

    const yes = new MessageButton()
        .setStyle('blurple')
        .setLabel('Y E S')
        .setID('click_to_function1');

    const no = new MessageButton()
        .setStyle('blurple')
        .setLabel('N O')
        .setID('click_to_function2');

    message.channel.send({
        buttons: [yes, no],
        embed: embed
    });
};

module.exports.help = {
	name: "a",
	aliases: "",
	description: "",
	usage: "",
	category: "developer",
};

module.exports.config = {
	permission: "",
	cooldown: 0,
};