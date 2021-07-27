const { Client, Collection } = require("discord.js");
const util = require("util");
const fs = require("fs-extra");
const readdir = util.promisify(fs.readdir);
const { sep } = require("path");
const { success, error, warning } = require("log-symbols");
const mongoose = require("mongoose");

const bot = new Client();
require("./database/util/functions")(bot); 
require("discord-buttons")(bot);	

const CONFIG = require("./config");
const EMOJIS = require("./assets/json/emojis.json");
bot.CONFIG = CONFIG;
bot.EMOJIS = EMOJIS;

["commands", "aliases"].forEach(x => bot[x] = new Collection()); // Collect all commands and aliases.

const load = async (dir = "./commands/") => {

	/* Loading Commands.. */
	console.log(`=-=-=-=-=-=- Loading commands -=-=-=-=-=-=`)
	fs.readdirSync(dir).forEach(dirs => {
		const commands = fs.readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files => files.endsWith(".js"));

		for (const file of commands) {
			const cmd = require(`${dir}/${dirs}/${file}`);

			if (cmd.config && typeof (cmd.config.name) === "string" && typeof (cmd.config.category) === "string") {
				if (bot.commands.get(cmd.config.name)) return console.warn(`${warning} Two or more commands have the same name: ${cmd.config.name}.`);
				bot.commands.set(cmd.config.name, cmd);
				console.log(`${success} Loaded command ${cmd.config.name} from ${cmd.config.category}.`);
			} else {
				console.log(`${error} Error loading command in ${dir}${dirs}. You have a missing config.name or config.name is not a string. or you have a missing config.category or config.category is not a string`);
				continue;
			}

			if (cmd.config.aliases && typeof (cmd.config.aliases) === "object") {
				cmd.config.aliases.forEach(alias => {
					if (bot.aliases.get(alias)) return console.warn(`${warning} Two commands or more commands have the same aliases: ${alias}`);
					bot.aliases.set(alias, cmd.config.name);
				});
			}
		}

	});

	/* Loading Events.. */
	console.log(`=-=-=-=-=-=- Loading events -=-=-=-=-=-=`)
	const evtFiles = await readdir("./events/");
	evtFiles.forEach((file) => {
        	const eventName = file.split(".")[0];
        	console.log(`${success} Loaded event ${eventName}.`);
        	const event = new (require(`./events/${file}`))(bot);
        	bot.on(eventName, (...args) => event.run(...args));
        	delete require.cache[require.resolve(`./events/${file}`)];
	});
	
	/* Initialize Database */
	bot.mongoose = require("./database/util/mongoose");
	bot.mongoose.init();
};

load(); // Load commands, events and connect to database.

bot.login(process.env.TOKEN);
