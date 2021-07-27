module.exports = class GuildDelete {
    
    constructor (bot) {

        this.bot = bot;
    }

    async run (guild) {

        let bot = this.bot;
        
        // Delete server settings
        await bot.deleteGuild(guild);
    }
}