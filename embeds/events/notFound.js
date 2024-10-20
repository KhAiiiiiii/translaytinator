const { EmbedBuilder } = require('discord.js')

const notFoundEmbed = new EmbedBuilder()
                        .setColor('#ff0000')
                        .setTitle('❌ Command not found!')
                        .setDescription('If you believe this is an error, please contact the developer.')
                        .setTimestamp()

module.exports = { notFoundEmbed }