const mongoose = require("mongoose");
const { Guild } = require("../models/index");

module.exports = bot => {

    /* Guild */
    bot.createGuild = async guild => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, guild);
        const createGuild = await new Guild(merged);
        createGuild.save().then(g => console.log(`[DB_LOG] ${g.guildName} (${g.guildID}) has been added to the guilds collection.`));
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
		}).then(g => console.log(`[DB_LOG] ${g.guildName} (${g.guildID}) has been removed of the guilds collection.`));
    }

    /* User */
    bot.createUser = async user => {
        const merged = Object.assign({ _id: mongoose.Types.ObjectId() }, user);
        const createUser = await new User(merged);
        createUser.save().then(u => console.log(`[DB_LOG] ${u.tag} has been added to the user collection.`));
    }

    bot.getUser = async user => {
        const data = await Guild.findOne({ userID: user.id });
        if(data) return data;
        else return;
    };

    bot.updateUser = async (user, settings) => {
        let data = await bot.getUser(user);
        if (typeof data !== "object") data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] = settings[key];
        }
        return data.updateOne(settings);
    };
};