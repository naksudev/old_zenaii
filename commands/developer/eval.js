// Dependencies
const { inspect } = require('util');

module.exports.run = async (bot, message, args) => {

    if (!bot.config.owners.includes(message.author.id)) return;

    let evaled;
    try {
    evaled = await eval(args.join(' '));
    message.channel.send(```${inspect(evaled)}```);
    console.log(inspect(evaled));
    } catch (error) {
    console.error(error);
    message.reply('there was an error during evaluation. Please check the console.');
    }

    message.delete();
};

module.exports.config = {
	name: "eval",
	aliases: "",
	description: "",
	usage: "",
	category: "developer",
    permission: [],
    cooldown: 0
};
