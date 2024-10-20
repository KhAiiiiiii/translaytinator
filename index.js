const { Client, IntentsBitField } = require('discord.js')

require('dotenv').config()

global.client = new Client({
    intents: [
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.MessageContent
    ]
})

client.config = require('./config.js')

require('./src/loader.js')

const token = process.env.discord_token
client.login(token)