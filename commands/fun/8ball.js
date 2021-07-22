// Dependencies
const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

    const eightballanswersjson = require(`../../assets/8ball_answers.json`);

    if (!args[2]) return message.channel.send(`❓ | You have to specify what you want to ask to the bot!`);

    // Store the answers
    const eightballAnswers = [];

    for (const x in eightballanswersjson) {
        if (x.includes('eightball_answer')) {
            eightballAnswers.push(eightballanswersjson[x]);
        }
    }

    const eightballAnswersIndex = Math.floor(Math.random() * eightballAnswers.length);

    let embedresult = new Discord.MessageEmbed()
        .setColor(Math.floor(Math.random() * 16777214) + 1)
        .setAuthor(`The magic 8ball 🎱`, bot.user.displayAvatarURL())
        .setDescription(`**Question:** ${args.join(" ")} \n\n**Answer:** ${eightballAnswers[eightballAnswersIndex]}`)
        .setTimestamp(message.createdAt)
        .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL());
    message.channel.send(embedresult);
};

module.exports.help = {
    name: "8ball",
    aliases: ["ask"],
    description: "Ask me anything.",
    usage: "<message>",
    category: "fun",
};

module.exports.config = {
    permission: "",
    cooldown: 2,
};