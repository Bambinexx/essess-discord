const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("roll")
        .setDescription(`\`roll [number]\` - Roll a random number between 0 and the given number (default is 100).`)
        .addIntegerOption(option =>
            option
                .setName("max")
                .setDescription("The maximum number to roll")
        ), 
    
    async execute(interaction) {
        let maxValue = 100;
        let maxNumber = interaction.options.getInteger("max");

        if( maxNumber != undefined && maxNumber > 0) {
            maxValue = maxNumber;
        }

        let roll = Math.floor(Math.random() * (maxValue + 1));
        await interaction.reply(`${interaction.user} rolled **${roll}** !`);
    }
};