const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { getColorFromURL } = require('color-thief-node');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("changelog")
		.setDescription("Show Essess' changelog"),
	
    async execute(interaction) {
        let color = await getColorFromURL('https://cdn.discordapp.com/attachments/974975971314761759/1029478440790929540/catch-icon-6.50.png');
        let content = `
        **v3 Changelog:**

        Added support for the slash commands, all commands can now be used using the discord slash commands.

        Just write /{your_command} now instead of ??{your_command}.

        tl;dr the bot works now

        * Removed support for /envision.
        `;

        let embed = new EmbedBuilder()
        .setAuthor(
            { 
				name: `Essess Changelog`,
            	iconURL: `https://cdn.discordapp.com/attachments/974975971314761759/1029478440790929540/catch-icon-6.50.png`,
            }
        )
        .setDescription(content)
        .setColor(color)
        .setFooter({ text: `Made by Noctalium#1621 and bambinexx#5543` });

		console.log("embed created successfully ");

        return interaction.reply({ embeds: [embed] });
    }
};

/*
**v1.4.0 Changelog:**

        **+** Added the \`??top [username]\` command: Display the top 5 pp plays of user.

        **+** Added the \`??mapfeed\` command: Track newly ranked beatmap and send a message every time a new one is ranked.

        ----------

**v1.5.0 Changelog:**

        **+** Added the \`??changelog\` command: Display the most recent change to the bot.

        **+** Added the \`??lbinfo\` command: Display information about the unranked leaderboard feature.

        **->** Modified the \`??help\` command to make it better.

        ---------

**v2.0.0 Changelog:**

        **▸** Fixed bugs with the player command (\`${prefix}track (username)\`) where some tracks didn't ever worked

        **▸** User with no profile picture can now use the bot

        **▸** Fixed bug where, sometimes, randomly, commands didn't worked at all (blame peppy on this one)

        **▸** Added new difficulty colors

        **▸** Optimized the code, to prepare something else big (soontm) 👀

        **->** To avoid useless spam, the \`${prefix}track (username)\` command do not allow players with less than **3000pp** to be tracked
*/

/*
        **v2.1.0 Changelog:**

        **+** \`${prefix}unlink\` command, to unlink and remove your data from Essess database

        **v2.0.1 - 2.0.2 Changelog:**

        **▸** Fixed wrong beatmap URLs with the \`${prefix}acc\` command

        **▸** Fixed wrong AR with the \`${prefix}pp\` command

        **▸** Fixed the \`${prefix}osuset\` command, it works fine now
*/