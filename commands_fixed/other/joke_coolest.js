const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('coolest')
        .setDescription('meme'),

    async execute(interaction) {
       await interaction.reply(`
       Oh yeah, yeah ブレるな hey boys あふれ出す 想い 己つらぬけよ
       スペシャルをプレゼント 行こうぜ go! ありのままで
       Break out! 嵐起こせ おもてなす お前連れてく heaven へ
       Wake up! 弱き者よ はみ出せ hey! 空気なんて読むなよ
       檻破れ お前のスタイル押し通せ ah, virtuous knight
       共に行こう`);
    }
};