const { EmbedBuilder } = require('discord.js')

const translationResultEmbedBuilder = ({ translatedText, originalMessage }) => {
    const translationResultEmbed = new EmbedBuilder()
                                    .setColor('#42b6f8')
                                    .setAuthor({ name: 'Translated Text' })
                                    .setDescription(translatedText)
                                    .setTimestamp()
                                    .setFooter({ text: `Interpretation provided by ${global.client.config.aiModel} model` })
    if(originalMessage) {
        translationResultEmbed.addFields(
            { name: 'View original message', value: `[Click here](${originalMessage})` }
        )
    }
    return translationResultEmbed
}

module.exports = { translationResultEmbedBuilder }