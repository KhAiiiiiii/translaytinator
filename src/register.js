const { REST, Routes } = require('discord.js')
const { readdirSync } = require('fs')

const TOKEN = process.env.discord_token
const CLIENTID = process.env.client_id

const commands = []

const commandFiles = readdirSync('./commands/').filter(file => file.endsWith('.js'))

for(const file of commandFiles) {
    const command = require(`../commands/${file}`)
    if(command.hasOwnProperty('name') && command.hasOwnProperty('description') && command.hasOwnProperty('execute')) {
        commands.push(command)
    } else {
        console.log(`[WARNING] The command at ${file} is missing a required \`name\`, \`description\` or \`execute\` property`)
    }
}

const rest = new REST({ version: 10 }).setToken(TOKEN);
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands`)

        const data = await rest.put(
            Routes.applicationCommands(CLIENTID),
            { body: commands }
        )

        console.log(`Successfully reloaded ${data.length} application (/) commands`)
    } catch(e) {
        console.error(e)
    }
})();