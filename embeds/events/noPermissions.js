const { EmbedBuilder } = require('discord.js')

const noPermissionsEmbed = new EmbedBuilder()
                        .setColor('#ff0000')
                        .setTitle('❌ You don\'t have the required permissions to use this command!')
                        .setDescription('If you believe this is an error, please contact the developer.')
                        .setTimestamp()

module.exports = { noPermissionsEmbed }