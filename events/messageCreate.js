const { ButtonBuilder, ActionRowBuilder } = require('discord.js')

const { languageDictionary } = require('../oracle/dataset.js')
const { promptEmbed } = require('../embeds/index.js')

module.exports = async (client, message) => {
    if(message.author.bot) return

    let slangCount = 0
    const promises = languageDictionary.map(word => {
        return new Promise(res => {
            const matches = message.content.match(new RegExp(`(?:[^a-z]|^)(${word.trim()})(?=[^a-z]|$)`, 'gi'))
            if(matches) slangCount += matches.length
            return res()
        })
    })
    
    await Promise.all(promises)
    const slangPct = slangCount / message.content.split(' ').length

    if(slangPct > client.config.promptThreshold) {
        message.reply({
            embeds: [ promptEmbed ],
            components: [
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setStyle('Success')
                        .setCustomId('promptYes')
                        .setLabel('Yes, translate my message'),
                    new ButtonBuilder()
                        .setStyle('Danger')
                        .setCustomId('promptNo')
                        .setLabel('No, go away!')
                    )
            ]
        })
    }
    return
}