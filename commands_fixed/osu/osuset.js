const sqlLib = require('../../lib/sqlLib');
const osuApi = require('../../lib/osuApi');
const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('osuset')
        .setDescription('Link your discord account with your osu! account.')
        .addStringOption(option =>
            option.setName('username')
            .setDescription("Your osu! username")
        ),
    
    async execute(interaction) {
        const usernameArg = interaction.options.getString("username")

        if(usernameArg === null) {
            return interaction.reply(`:x: Please use \`/osuset (username)\`.`);
        }

        let user = await osuApi.v2.user.details(usernameArg, 
                                                "fruits",
                                                "username");

        if(user.length == 0) {
            return interaction.reply(':x: This user do not exist.');
        }

        console.log(user.id);

        let username = await sqlLib.getLinkedUser(interaction.user.username);

        if(username == null) {
            let insert = await sqlLib.linkUser(interaction.user.username, user.id);
            if(insert) return interaction.reply(`:white_check_mark: Your osu! username has been set to **${user.username}**`);
        } else {
            let update = await sqlLib.updateLinkedUser(interaction.user.username, user.id);
            if(update) interaction.reply(`:white_check_mark: Your osu! username has been updated to **${user.username}**`);
        }
    }
}