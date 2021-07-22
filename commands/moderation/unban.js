// Dependencies
const Discord= require("discord.js");

module.exports.run = async (bot, message, args) => {
	
	let user = message.mentions.members.first();
	const reasonArgs = args.slice(1).join(' ');

	if (!message.member.hasPermission("BAN_MEMBERS")) return;
  
	let member;
  
	if (user) {
	  member = await message.guild.member(user);
	}
  
	if (!user) {
	  try {
		const fetchedMember = await message.guild.member(args.slice(0, 1).join(' '));
		if (!fetchedMember) throw new Error('User not found!');
		member = fetchedMember;
		user = fetchedMember;
		user = user.user;
	  } catch (error) {
		return message.channel.send(`:question: | User not found! ${message.author}`);
	  }
	}
  
	if (user === message.author) return message.channel.send(`:x: | You can't ban yourself ! ${message.author}`);

	if (!reasonArgs) return message.channel.send(`:x: | You need to put a reason to the ban ! ${message.author}`);
  
	if (!member.kickable) return message.channel.send(`:x: | I can't ban this user. He's too powerful. ${message.author}`);
	await member.ban({days: daysArgs, reason: `Banned by ${message.author.username}${message.author.tag}\nReason : ${reasonArgs}`});
  
	const banembed = new Discord.MessageEmbed()
	  .setAuthor('Unbanned', bot.user.displayAvatarURL())
	  .setColor('#99ff66')
	  .setDescription(`✅ ${member.user.tag} was unbanned.\nReason : ${reasonArgs}`)
	  .setFooter(`Banned by ${message.author.tag}`, message.author.displayAvatarURL);
	message.channel.send(banembed);
};

module.exports.help = {
	name: "unban",
	aliases: "",
	description: "Ban a user from the server.",
	usage: "<@User> [reason]",
	category: "moderation",
};

module.exports.config = {
	permission: ["BAN_MEMBERS"],
	cooldown: 1,
};