const { EmbedBuilder } = require('discord.js')

const promptEmbed = new EmbedBuilder()
                    .setColor('#42b6f8')
                    .setTitle(`Woah there!`)
                    .setDescription('It looks like some people may find it difficult understanding your robust use of language there! Would you like to translate that into common English?')
                    .setTimestamp()

module.exports = { promptEmbed }