const mongoose = require("mongoose");
const CONFIG = require("../../config");

const guildSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    guildID: String,
    guildName: String,
    prefix : {
        "type": String,
        "default": CONFIG.DEFAULTSETTINGS.prefix
    }
})

module.exports = mongoose.model("Guild", guildSchema);
