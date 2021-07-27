module.exports.run = async (bot, message, args) => {

	const sayMessage = args.join(" ");
	message.delete();
	return message.channel.send(sayMessage);
};

module.exports.config = {
	name: "say",
	aliases: "",
	description: "Replies with the text you provide.",
	usage: "<message>",
	category: "fun",
    permission: [],
	cooldown: 1
};