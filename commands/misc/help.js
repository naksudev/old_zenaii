// Dependencies
const Discord= require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args, settings) => {
			
	const embed = new Discord.MessageEmbed() 
		.setColor("#2C2F33")
		.setAuthor(`Commands`, bot.user.displayAvatarURL())
		.setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL())
		.setTimestamp();

	if (args[0]) {
		let command = args[0];
		let cmd;
		if (bot.commands.has(command)) {
			cmd = bot.commands.get(command);
		}
		else if (bot.aliases.has(command)) {
			cmd = bot.commands.get(bot.aliases.get(command));
		}
		if(!cmd) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${settings.prefix}help\` for the list of the commands.`));
		command = cmd;
		embed.setTitle(`${command.help.name.slice(0, 1).toUpperCase() + command.help.name.slice(1)} command`);
		embed.setDescription([
			`❯ **Command:** ${command.help.name.slice(0, 1).toLowerCase() + command.help.name.slice(1)}`,
			`❯ **Description:** ${command.help.description || "No Description provided."}`,
			`❯ **Usage:** ${command.help.usage ? `\`${settings.prefix}${command.help.name} ${command.help.usage}\`` : `\`${settings.prefix}${command.help.name}\``} `,
			`❯ **Aliases:** ${command.help.aliases ? command.help.aliases.join(", ") : "None"}`,
			`❯ **Cooldown:** ${`${cmd.config.cooldown} seconds` || "No cooldown."}`,
			`❯ **Category:** ${command.help.category.slice(0, 1).toUpperCase() + command.help.category.slice(1)}`,
		].join("\n"));

		return message.channel.send(embed);
	}

	const categories = fs.readdirSync("./commands/");
	embed.setDescription([
		`Use \`${settings.prefix}help <command>\` for more informations.`,
		`**Example:** \`${settings.prefix}help avatar\``,
		"**Reminder:** `<>` means needed and `[]` it is optional but don't include those.",
	].join("\n"));
	categories.forEach(category => {
		const dir = bot.commands.filter(c => c.help.category.toLowerCase() === category.toLowerCase());
		const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);

		try {
			if (dir.size === 0) return;
			if (bot.CONFIG.owners.includes(message.author.id)) embed.addField(`❯ ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "));
			else if (category !== "developer") embed.addField(`❯ ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "));
		} catch (e) {
			console.log(e);
		}
	});
	return message.channel.send(embed);
};

module.exports.help = {
	name: "help",
	aliases: "",
	description: "Shows the command or show more details about the specified command.",
	usage: "[command]",
	category: "misc",
};

module.exports.config = {
	permission: "",
	cooldown: 1.5,
};