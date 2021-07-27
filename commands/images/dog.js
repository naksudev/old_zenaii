// Dependencies
const Discord = require('discord.js');
const querystring = require('querystring');
const r2 = require('r2');
require('dotenv').config();

module.exports.run = async (bot, message, args) => {

    const DOG_API_URL = "https://api.thedogapi.com/";
    const DOG_API_KEY = process.env.DOG_API_KEY;

    try {
        var images = await loadImage();

        var image = images[0];
        
        const embed = new Discord.MessageEmbed()
            .setImage(image.url)
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setAuthor(`🐶 | Here is a random dog for ${message.author.tag} !`)
            .setTimestamp(message.createdAt)
            .setFooter("Zenaii © Powered by https://api.thedogapi.com/", bot.user.displayAvatarURL());
        return message.channel.send({embed});

    } catch(error) {
        console.log(error);
    }

    async function loadImage() {

        var headers = { 'X-API-KEY': DOG_API_KEY };
        var query_params = {
            'mime_types':'true',
            'size':'small',  
            'limit' : 1     
        }

        let queryString = querystring.stringify(query_params);

        try {
            let _url = DOG_API_URL + `v1/images/search?${queryString}`;
            var response = await r2.get(_url , {headers} ).json
        } catch (e) {
            console.log(e);
        }
        return response;
    }
    
};

module.exports.config = {
	name: "dog",
	aliases: ["woof", "doggo"],
	description: "Shows a random pic of dogs.",
    usage: "",
	category: "images",
    permission: ["EMBED_LINKS"],
	cooldown: 3
};
