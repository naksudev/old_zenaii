// Dependencies
const { readdirSync } = require("fs");
const { join } = require("path");

module.exports.run = async (bot, message, args, settings) => {

	if (!bot.CONFIG.owners.includes(message.author.id)) return;

	if (!args[0]) return message.channel.send("Please provide a command to reload!");
	
	const commandName = args[0].toLowerCase();
	const command = bot.commands.get(commandName) || bot.commands.get(bot.aliases.get(commandName));
	if (!command) return message.channel.send("That command doesn't exist. Try again.");
	readdirSync(join(__dirname, "..")).forEach(f => {
		const files = readdirSync(join(__dirname, "..", f));
		if (files.includes(`${commandName}.js`)) {
			const file = `../${f}/${commandName}.js`;
			try {
				delete require.cache[require.resolve(file)];
				bot.commands.delete(commandName);
				const pull = require(file);
				bot.commands.set(commandName, pull);
				return message.channel.send(`Successfully reloaded \`${commandName}\`!`);
			} catch (err) {
				message.channel.send(`Could not reload: \`${args[0].toUpperCase()}\``);
				return console.log(err.stack || err);
			}
		}
	});

	message.delete();
};

module.exports.config = {
	name: "reload",
	aliases: "",
	description: "",
	usage: "",
	category: "developer",
    permission: [],
	cooldown: 0
};