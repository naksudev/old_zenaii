// Dependencies
const Discord= require("discord.js");

module.exports.run = async (bot, message, args) => {
	
	const user = args[0];
	let reasonArgs = args.slice(1).join(' ');

    if (!message.member.hasPermission("BAN_MEMBERS")) return;

    if (!user) return message.reply(":question: | You must provide the ID of the user to unban him. Do \`banlist\`.");

    const bans = await message.guild.fetchBans();
    if (!bans.get(user)) return message.reply(":question: | The ID of the user you provided is not banned or doesn't exist.");

	if(!reasonArgs) reasonArgs = "No reason provided.";

    await message.guild.members.unban(user, {reason: `Unbanned by ${message.author.tag} | Reason : ${reasonArgs}`});

    let banembed = new Discord.MessageEmbed()
        .setColor('#99ff66')
        .setDescription(`✅ <@${user}>`)
        .setFooter(`Unbanned by ${message.author.tag}`, message.author.displayAvatarURL);
    message.channel.send(banembed);
};

module.exports.config = {
	name: "unban",
	aliases: "",
	description: "Unban a user from the server.",
	usage: "<@User> [reason]",
	category: "moderation",
    permission: ["BAN_MEMBERS"],
	cooldown: 1
};