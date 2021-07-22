const mongoose = require("mongoose");
const { Guild } = require("../models/index");

module.exports = bot => {

    /* Guild */
    bot.createGuild = async guild => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
        const createGuild = await new Guild(merged);
        createGuild.save().then(g => console.log(`Someone invited me in ${g.guildName}`))
    };

    bot.getGuild = async guild => {
        const data = await Guild.findOne({ guildID: guild.id });
        if(data) return data;
        return bot.CONFIG.DEFAULTSETTINGS;
    };

    bot.updateGuild = async (guild, settings) => {
        let data = await bot.getGuild(guild);
        if (typeof data !== "object") data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
    };

    bot.deleteGuild = async (guild) => {
        const data = await Guild.findOne({ guildID: guild.id });
		Guild.deleteOne(data, function(err) {
			if (err) throw err;
		});
    }
    /* End Guild */
};