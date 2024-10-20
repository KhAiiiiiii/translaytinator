const { EmbedBuilder } = require('discord.js')

const translationFromEmbedBuilder = ({ originalText }) => {
    const translationFromEmbed = new EmbedBuilder()
                                    .setColor('#42b6f8')
                                    .setAuthor({ name: 'Original Text' })
                                    .setDescription(`\`\`\`${originalText}\`\`\``)
                                    .setTimestamp()
    return translationFromEmbed
}

module.exports = { translationFromEmbedBuilder }