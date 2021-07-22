module.exports.run = async (bot, message, args) => {

	const sayMessage = args.join(" ");
	message.delete();
	return message.channel.send(sayMessage);
};

module.exports.help = {
	name: "say",
	aliases: "",
	description: "Replies with the text you provide.",
	usage: "<message>",
	category: "fun",
};

module.exports.config = {
	permission: "",
	cooldown: 1,
};