// Dependencies
const Discord = require('discord.js');
// Collection of users in cooldown
const cooldowns = new Discord.Collection();

module.exports = class MessageEvent {
    
    constructor (bot) {
        
        this.bot = bot;
    }

    async run (message) {       

        let bot = this.bot;

        // Don't respond to bot and DM messages
        if (message.author.bot || !message.guild) return;

        // Get server settings
        let settings;
        try {
            settings = await bot.getGuild(message.guild);
        } catch (err) {
            settings = bot.CONFIG.DEFAULTSETTINGS;
        }

        // Check if server settings is stored in database
        if (!settings && message.channel.type != 'dm') {
            await bot.emit('guildCreate', message.guild);
            try {
                settings = await bot.getGuild(message.guild);
            } catch (err) {
                console.error(err.message);
            }
        }
 
        // Commands
        const args = message.content.split(' ');
        const command = args.shift().slice(settings.prefix.length).toLowerCase();
        const cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));

        if (cmd && message.content.startsWith(settings.prefix)) {
            // Check if the commands needs permissions
            // TODO: Fix this and pull to dev then merge to main 
            if (!message.guild.me.hasPermission(cmd.config.permission)) return message.channel.send(`:x: | I don't have permission to use this command ! Do ${settings.prefix}help ${cmd.name} to check the permissions needed${message.author}`);

            // Check to see if user is in 'cooldown'
            if (!cooldowns.has(cmd)) {
                cooldowns.set(cmd, new Discord.Collection());
            }
            
            const now = Date.now();
            const timestamps = cooldowns.get(cmd);
            const cooldownAmount = (cmd.config.cooldown) * 1000;
            
            if (timestamps.has(message.author.id)) {
                const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
    
                if (now < expirationTime) {
                    const timeLeft = (expirationTime - now) / 1000;
                    return message.channel.send(`🕦 | Please wait **${timeLeft.toFixed(1)} more second(s)** before reusing the \`${command}\` command. ${message.author}`).then(message.delete());
                }
            }
    
            // Run Command
            cmd.run(bot, message, args, settings);
            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);            
        }
    }
};