const { Client, Collection } = require("discord.js");

// Dependencies
const util = require("util");
const fs = require("fs-extra");
const readdir = util.promisify(fs.readdir);
const { sep } = require("path");
const { success, error, warning } = require("log-symbols");
const mongoose = require("mongoose");

// Creating client & loading instances methods to use on commands
const bot = new Client();
require("./database/util/functions")(bot); 
require("discord-buttons")(bot);	

const CONFIG = require("./config");
const EMOJIS = require("./assets/emojis.json");
bot.CONFIG = CONFIG;
bot.EMOJIS = EMOJIS;

["commands", "aliases"].forEach(x => bot[x] = new Collection()); // Collect all commands and aliases.

const load = async (dir = "./commands/") => {

	/* Loading Commands.. */
	console.log(`=-=-=-=-=-=- Loading commands -=-=-=-=-=-=`)
	fs.readdirSync(dir).forEach(dirs => {
		const commands = fs.readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files => files.endsWith(".js"));

		for (const file of commands) {
			const pull = require(`${dir}/${dirs}/${file}`);

			if (pull.help && typeof (pull.help.name) === "string" && typeof (pull.help.category) === "string") {
				if (bot.commands.get(pull.help.name)) return console.warn(`${warning} Two or more commands have the same name: ${pull.help.name}.`);
				bot.commands.set(pull.help.name, pull);
				console.log(`${success} Loaded command ${pull.help.name} from ${pull.help.category}.`);
			} else {
				console.log(`${error} Error loading command in ${dir}${dirs}. You have a missing help.name or help.name is not a string. or you have a missing help.category or help.category is not a string`);
				continue;
			}

			if (pull.help.aliases && typeof (pull.help.aliases) === "object") {
				pull.help.aliases.forEach(alias => {
					if (bot.aliases.get(alias)) return console.warn(`${warning} Two commands or more commands have the same aliases: ${alias}`);
					bot.aliases.set(alias, pull.help.name);
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

load(); // Load commands, events and database.

bot.login(process.env.TOKEN);
