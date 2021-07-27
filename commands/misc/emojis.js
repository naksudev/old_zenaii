module.exports.run = async (bot, message, args) => {

    const emojiList = message.guild.emojis.cache.map(e => `${e}`).join(" ");

    if (emojiList.length >= 1950) list = `${emojiList.slice(0, 1948)}...`;

    message.channel.send(`**Here is all the emojis of this server:** \n${emojiList}`);
};

module.exports.config = {
	name: "emojis",
	aliases: "",
	description: "Lists all the custom emojis of the guild.",
	usage: "",
	category: "misc",
    permission: ["MANAGE_EMOJIS"],
	cooldown: 2
};

