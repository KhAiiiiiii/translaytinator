const { EmbedBuilder } = require('discord.js')

const wordleEndEmbedBuilder = ({ gameHash, won, answer, tries, chances, startTime, endTime }) => {
    const wordleEndEmbed = new EmbedBuilder()
                            .setTimestamp()
                            .setTitle(`GAME OVER... You ${won ? 'WON' : 'LOST'}`)
                            .setDescription(`The word was *${answer}*\nYou used **${tries} tries** out of **${chances} tries**\nThe game ran for **${Math.floor((endTime - startTime) / 1000)} seconds**\n\nThank you for playing!`)
                            .setColor(won ? "Green" : "Red")
                            .setFooter({ text: gameHash })

    return wordleEndEmbed
}

module.exports = { wordleEndEmbedBuilder }