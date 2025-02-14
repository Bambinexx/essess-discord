const fs = require('node:fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');
const { clientId, guildId, token } = require('./config.json');

const commands = []

const commandsPath = path.join(__dirname, 'commands_fixed');
const osuCommandsPath = path.join(commandsPath, 'osu')
const otherCommandsPath =  path.join(commandsPath, 'other')
const commandsFiles = {
    osuCommands: [
        fs.readdirSync(osuCommandsPath).filter(file => file.endsWith(".js")),
        osuCommandsPath + "/"
    ],
    otherCommands: [
        fs.readdirSync(otherCommandsPath).filter(file => file.endsWith(".js")),
        otherCommandsPath + "/"
    ]
}


for (const [k, val] of Object.entries(commandsFiles)) {
    for (const file of val[0]) {
        command = require(val[1] + file)
        commands.push(command.data.toJSON())
    }
}


const rest = new REST({ version: '10' }).setToken(token);

rest.put(Routes.applicationCommands(clientId), { body: commands })
	.then(data => console.log(`Successfully registered ${data.length} application commands.`))
	.catch(console.error);