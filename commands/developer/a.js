// Dependencies
const Discord = require('discord.js');
const { MessageMenuOption, MessageMenu } = require("discord-buttons");

module.exports.run = async (bot, message, args) => {
    let option = new MessageMenuOption()
    .setLabel('Your Label')
    .setEmoji('🍔')
    .setValue('menuid')
    .setDescription('Custom Description!')
    
    let select = new MessageMenu()
        .setID('customid')
        .setPlaceholder('Click me! :D')
        .setMaxValues(1)
        .setMinValues(1)
        .addOption(option)

    message.channel.send('Text with menu!', select);
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