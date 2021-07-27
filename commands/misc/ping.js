module.exports.run = async (bot, message, args) => {
	
	const msg = await message.channel.send("Pinging...");
	await msg.edit(`🏓 | Pong! ${msg.createdTimestamp - message.createdTimestamp}ms.`);
};

module.exports.config = {
	name: "ping",
	aliases: "",
	description: "Ping a thing.",
	usage: "",
	category: "misc",
    permission: [],
	cooldown: 3.5
};
