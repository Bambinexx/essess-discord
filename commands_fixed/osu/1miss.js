const sqlLib = require('../../lib/sqlLib');
const osuApi = require('../../lib/osuApi');
const { SlashCommandBuilder } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('1miss')
        .setDescription(`Count the number of 1miss plays in user's top plays`)
        .addStringOption(option =>
            option
                .setName("username")
                .setDescription("username of the person")
        ),

    async execute(interaction) {
        let usernameArg = interaction.options.getString("username")

        let username = await sqlLib.getLinkedUser(interaction.user.username);

        if(username == null) {
            return interaction.reply(`:x: Please link your osu! profile first with \`/osuset (username)\`.`);
        }

        if(usernameArg !== null) {
            username = usernameArg;
        }

        let user = await osuApi.v2.user.details(username,
                                                "fruits",
                                                "username");


        if(user.length == 0) {
            return interaction.reply(':x: This user do not exist.');
        }

        let userBest = await osuApi.v2.user.scores.category(username, "best", { mode: "fruits", limit: 100 });

        let oneMissCount = 0;
        for(let i = 0; i < userBest.length; i++) {
            let score = userBest[i];
            if(parseInt(score.statistics.count_miss) === 1) {
                oneMissCount++;
            }
        }

        if(oneMissCount == 0) {
            msg = `**${interaction.user.username}** doesn't have any 1 miss play in his Top PP plays.`
        } else {
            msg = `**${interaction.user.username}** has **${oneMissCount}x** 1miss play(s) in his Top PP plays.`;
        }

        return interaction.reply(msg);
    }
}

