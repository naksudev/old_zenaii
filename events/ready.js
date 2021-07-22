const config = require("../config");

module.exports = class Ready {
    
    constructor (bot) {

        this.bot = bot;
    }

    async run () {
        
        let bot = this.bot;

        // Set presence to bot
        const settingsPresence = config.presence;
        await bot.user.setPresence(settingsPresence);
        // Log event
        console.log("I'm ready!");
    }
};