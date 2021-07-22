module.exports = class GuildCreate {
    
    constructor (bot) {

        this.bot = bot;
    }

    async run (guild) {
        
        let bot = this.bot;

        // Log event
        console.log(`[LOG] ${guild.name} (${guild.id}) added me.`)
        // Apply server settings
        try {
            const settingsGuild = {
                guildID: guild.id,
                guildName: guild.name,
            };
            await bot.createGuild(settingsGuild);
        } catch (e) {
            console.error(e);
        }
    }
};
