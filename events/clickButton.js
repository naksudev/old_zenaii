// Dependencies
const { MessageButton } = require("discord-buttons");
const Discord = require('discord.js');

module.exports = class ClickButtonEvent {
    
    constructor (bot) {

        this.bot = bot;
    }

    async run (button) {

        let bot = this.bot;
        
        // Rock, Paper, Scissors
        let outcomes = ['🧱','📰','✂️'];
        let botOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
        let result = "You lose.";

        switch (button.id) {
            case 'rps_rock':
                button.reply.defer();
                
                break;
            case 'rps_paper':
                button.defer();
                break;
            case 'rps_scissors':
                button.defer();
                break;
            default:
                break;
        }
    }
}