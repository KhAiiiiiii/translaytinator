const { readdirSync } = require('fs')
const { Collection } = require('discord.js')

client.commands = new Collection()

// Register commands if current environment in production
process.env.prod && require('./register.js')

console.log('Loading events...')

const events = readdirSync('./events/').filter(file => file.endsWith('.js'))

for(const file of events) {
    const event = require(`../events/${file}`)
    const eventName = file.split('.')[0]
    console.log(`-> Loaded event ${eventName}`)
    client.on(eventName, event.bind(null, client))
    delete require.cache[require.resolve(`../events/${file}`)]
}

console.log('Loading commands...')

const commands = readdirSync(`./commands/`).filter(file => file.endsWith('.js'))

for(const file of commands) {
    const command = require(`../commands/${file}`)
    console.log(`-> Loaded command ${command.name.toLowerCase()}`)
    client.commands.set(command.name.toLowerCase(), command)
    delete require.cache[require.resolve(`../commands/${file}`)]
}
