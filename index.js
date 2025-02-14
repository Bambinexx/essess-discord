const Discord = require('discord.js');
const client = new Discord.Client({ intents: [] });

const fs = require('fs');
const cron = require('node-cron');

const { token, ownerID } = require('./config.json');
const con = require('./lib/mysqlConn');
const sqlLib = require('./lib/sqlLib');
const osuApi = require('./lib/osuApi');

client.commands = new Discord.Collection();

const commands = {
    osuCommands: [
        fs.readdirSync('./commands_fixed/osu').filter(file => file.endsWith('.js')),
        './commands_fixed/osu/'
    ],
    otherCommands: [
        fs.readdirSync('./commands_fixed/other').filter(file => file.endsWith('.js')),
        './commands_fixed/other/'
    ]
};

for(const [k, val] of Object.entries(commands)) {
    for(let file of val[0]) {
            let command = require(val[1] + file);
            client.commands.set(command.data.name, command);
        }
}

    
client.once('ready', () => {
    client.user.setActivity('v3.0 | /changelog', { type: 'PLAYING' })
    console.log('Ready');
});

client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return

    const command = interaction.client.commands.get(interaction.commandName)
    
    try {
        await command.execute(interaction)
    } catch (error) {
        console.error(error)
        await interaction.reply("ya un probleme la")
    }

    //const args = message.content.slice(prefix.length).trim().split(/ +/);

    /*
    if(message.author.id == ownerId) {
        if(command === 'migrate') client.commands.get('tracking_migration').execute(message, args);
    }*/

    // Commands
    /*if(command === 'ping') client.commands.get('ping').execute(message);*/
    //if(command === 'roll') client.commands.get('roll').execute(message, args);
    /*
    if(command === 'changelog') client.commands.get('changelog').execute(message, args);
    if(command === 'help') client.commands.get('help').execute(message, args, client.commands);

    if(command === 'recent' || command === 'rs') client.commands.get('recent').execute(message, args);
    if(command === 'osuset') client.commands.get('osuset').execute(message, args);
    if(command === 'unset' || command === 'unlink') client.commands.get('unset').execute(message, args);
    if(command === 'profile' || command === 'p') client.commands.get('profile').execute(message, args);
    if(command === '1miss') client.commands.get('1miss').execute(message, args);
    if(command === 'pp') client.commands.get('pp_calculator').execute(message, args);
    if(command === 'misscount' || command === 'mc') client.commands.get('misscount').execute(message, args);
    if(command === 'accuracy' || command === 'acc') client.commands.get('accuracy').execute(message, args);
    if(command === 'compare' || command === 'c' || command === 'flex') client.commands.get('compare').execute(message, args);
    if(command === 'score' || command === 's' || command === 'sc') client.commands.get('score').execute(message, args);
    if(command === 'topplay' || command === 'top' || command === 'ctbtop') client.commands.get('topplay').execute(message, args);

    if(command === 'mapfeed') client.commands.get('mapfeed').execute(message, args);
    if(command === 'track') client.commands.get('pp_track').execute(message, args);
    if(command === 'untrack') client.commands.get('pp_untrack').execute(message, args);

    if(command === 'finorza') client.commands.get('joke_finorza').execute(message, args);
    if(command === 'coolest') client.commands.get('joke_coolest').execute(message, args);
    if(command === 'image' || command === 'envision' || command === 'imagematerial') client.commands.get('joke_image_material').execute(message, args);
    if(command === 'bison') client.commands.get('joke_bison_charge').execute(message, args);*/

    /* TO FIX
    if(command === 'simulator' || command === 'sm') client.commands.get('simulator').execute(message, args);
    */
});


// Cron job
// */5 * * * * -> 5min              

//------- MAPFEED CRON -------//
/* Dont forget to add a / before the 5 pls
cron.schedule('*5 * * * *', async () => {
    console.log("Mapfeed CRON");
    let mapfeedChannels = await sqlLib.getAllMapfeedChannels();

    if(mapfeedChannels != null) {
        let lastDateCheck = new Date(await sqlLib.getLastMapfeedTime()).toISOString().slice(0, 19).replace('T', ' ');

        let maps = await osuApi.getBeatmaps({ m:2, since: lastDateCheck});

        for(const channel of mapfeedChannels) {
            try {
                let chan = await client.channels.fetch(channel.channel_id);
                await client.commands.get('mapfeed_msg').execute(chan, maps, channel.channel_id);
            }
            catch(err) {
                console.log(`Channel not found (${channel.channel_id})`, err);
                await sqlLib.deleteMapfeedChannel(channel.channel_id);
            }
        }
    }
    await sqlLib.updateMapfeedTime();
});
*/

//------- PP TRACKING CRON -------//
/* Dont forget to add a / before the 5 pls
cron.schedule('*5 * * * *', async () => {
    console.log("Tracking CRON");
    let trackedUsers = await sqlLib.getAllTrackedUsers();
    if(trackedUsers != null) {
        for(const user of trackedUsers) {
            await client.commands.get('pp_tracking_msg').execute(user, client);
        }
    }
});
*/


client.login(token);