const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bison')
        .setDescription('meme'),

    async execute(interaction) {
       await interaction.reply(`
       ♻️🧠
🦬💨
       `);
    }
};