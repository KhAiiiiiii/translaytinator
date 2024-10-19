const { EmbedBuilder } = require('discord.js')

const wordleGameEmbedBuilder = ({ gameHash, difficulty, chances, player }) => {
    const wordleGameEmbed = new EmbedBuilder()
                            .setTitle('WORDLE GAME STARTING...')
                            .setDescription('**GOOD LUCK!**')
                            .addFields(
                                { name: 'Difficulty:', value: difficulty.toString(), inline: true },
                                { name: 'Chances:', value: chances.toString(), inline: true },
                                { name: 'Player:', value: `${player}`, inline: true }
                            )
                            .setTimestamp()
                            .setColor('Random')
                            .setFooter({ text: gameHash })
    return wordleGameEmbed
}

module.exports = { wordleGameEmbedBuilder }