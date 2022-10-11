const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("finorza")
        .setDescription("finorza"),

    async execute(interaction) {
        await interaction.reply(`
        (Hah ah ah ah) (Hah ah ah ah)
        (Hah ah ah ah) (Hah ah ah ah)

        'questa e la fine'

        'accipere iecit'
        (har ar slutet) (nu gor vi det)

        'apri la porta'

        'non piu spaventato'

        (har ar slutet) (nu gor vi det)
        Hah...`);
    }
};