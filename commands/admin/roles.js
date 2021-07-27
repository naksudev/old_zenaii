module.exports.run = async (bot, message, args) => {

    if (!message.member.hasPermission("MANAGE_ROLES")) return;

    // Sorting the roles by position
    let roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).filter(r => r.position !== 0).map(r => `${r.name} → ${r.id}`);

    message.channel.send(`\`\`\`d\n${roles.join('\n')}\n\nTotal : ${roles.length}\`\`\``);
}

module.exports.config = {
    name: "roles",
    aliases: "",
    description: "Lists all the roles in the current guild.",
    usage: "",
    category: "admin",
    permission: ["MANAGE_ROLES"],
    cooldown: 2
};

