// Dependencies
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

    let user = message.mentions.members.first();
	let reasonArgs = args.slice(1).join(' ');

	if (!message.member.hasPermission("KICK_MEMBERS")) return;
  
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
  
	if (user === message.author) return message.channel.send(`:x: | You can't kick yourself ! ${message.author}`);

	if(!reasonArgs) reasonArgs = "No reason provided.";
  
	if (!member.kickable) return message.channel.send(`:x: | I can't kick this user. He's too powerful. ${message.author}`);
	await member.kick({reason: `Kicked by ${message.author.tag} | Reason : ${reasonArgs}`});
  
	let banembed = new Discord.MessageEmbed()
	  .setAuthor('Kick', bot.user.displayAvatarURL())
	  .setColor('#99ff66')
	  .setDescription(`✅ ${member.user.tag} was kicked.\n:scroll: ID: ${member.user.id}\nReason: ${reasonArgs}`)
	  .setFooter(`Kicked by ${message.author.tag}`, message.author.displayAvatarURL);
	message.channel.send(banembed);

};

module.exports.config = {
    name: "kick",
    aliases: "",
    description: "",
    usage: "<@User> [reason]",
    category: "moderation",
    permission: ["KICK_MEMBERS"],
    cooldown: 1
};