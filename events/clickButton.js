// Dependencies
const { MessageButton } = require("discord-buttons");
const Discord = require('discord.js');

module.exports = class ClickButton {
    
    constructor (bot) {

        this.bot = bot;
    }

    async run (button) {

        let bot = this.bot;
        
        /* RPS */
        let outcomes = ['🧱','📰','✂️'];
        let botOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
        let result = "You lose.";
        let choice;

        switch (button.id) {
            case 'rps_rock':
                choice = "🧱"
                await button.reply.defer(true);
                if (botOutcome === "✂️") {
                    result = "You win!";
                } else if (botOutcome === "🧱") {
                    result = "It's a draw!";
                }
                break;
            case 'rps_paper':
                choice = "📰"
                await button.reply.defer(true);
                if (botOutcome === "🧱") {
                    result = "You win!";
                } else if (botOutcome === "📰") {
                    result = "It's a draw!";
                }
                break;
            case 'rps_scissors':
                choice = "✂️"
                await button.reply.defer(true);
                if (botOutcome === "📰") {
                    result = "You win!";
                } else if (botOutcome === "✂️") {
                    result = "It's a draw!";
                }
                break;
            default:
                break;
        }

        const embedResultRPS = new Discord.MessageEmbed()
            .setColor(Math.floor(Math.random() * 16777214) + 1)
            .setTitle(`Rock, Paper, Scissors - Results 📊`)
            .setDescription(`Me: ${botOutcome}\nYou: ${choice}\nResult: ${result}`)
            .setTimestamp(button.message.createdAt)
            .setFooter(`Challenged by ${button.clicker.user.tag}`, button.clicker.user.displayAvatarURL())

        button.reply.edit({embed: embedResultRPS});
        /* End RPS */
    }
}