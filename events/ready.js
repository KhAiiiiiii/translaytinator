const { ActivityType } = require('discord.js')

module.exports = async client => {
    console.log(`Logged in to client ${client.user.username}`)

    client.user.setPresence({
        activities: [{ name: client.config.userStatus.status, type: ActivityType[client.config.userStatus.type] }]
    })
}