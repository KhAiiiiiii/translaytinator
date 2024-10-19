const { EmbedBuilder } = require('discord.js')

const wordleAnswerEmbedBuilder = ({ results }) => {
    const wordleAnswerEmbed = new EmbedBuilder()
                                .setColor('Random')
                                .addFields(
                                    { name: '\`\`\`GUESS:\`\`\`', value: `\`\`\`\n${results.join(' ')}\n\`\`\``, inline: false },
                                    { name: 'ANSWER KEY:', value: '🟢: Letter is in the word and in the correct spot\n🟠: Letter is in the word but in the wrong spot\n🔴: Letter is not in the word in any spot', inline: false  }
                                )

    return wordleAnswerEmbed
}

module.exports = { wordleAnswerEmbedBuilder }