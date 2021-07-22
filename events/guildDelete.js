module.exports = class GuildDelete {
    
    constructor (bot) {

        this.bot = bot;
    }

    async run (guild) {

        let bot = this.bot;
        
        // Log event
        console.log(`[LOG] ${guild.name} (${guild.id}) removed the bot.`);
        // Delete server settings
        await bot.deleteGuild(guild);
    }
}