// Dependencies
const Discord = require('discord.js');
const { MessageButton } = require("discord-buttons");

module.exports.run = async (bot, message, args) => {

    const rock = new MessageButton()
        .setStyle('blurple')
        .setLabel('Rock 🧱')
        .setID('rps_rock');
    const paper = new MessageButton()
        .setStyle('blurple')
        .setLabel('Paper 📰')
        .setID('rps_paper');
    const scissors = new MessageButton()
        .setStyle('blurple')
        .setLabel('Scissors ✂️')
        .setID('rps_scissors');

    let embedchoice = new Discord.MessageEmbed()
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setTitle(`Rock, Paper, Scissors - Choose your weapon ⚔️`)
        .setDescription("Choose your weapon with the buttons below.")
        .setTimestamp(message.createdAt)
        .setFooter(`Challenged by ${message.author.tag}`, message.author.displayAvatarURL());

    message.channel.send({
        buttons: [rock, paper, scissors],
        embed: embedchoice
    });
};

module.exports.help = {
    name: "rps",
    aliases: ["rockpaperscissors"],
    description: "Plays Rock, Paper, Scissors with me.",
    usage: "",
    category: "fun",
};

module.exports.config = {
    permission: "",
    cooldown: 2,
};