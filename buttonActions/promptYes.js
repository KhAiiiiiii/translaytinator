const { ActionRowBuilder, ButtonBuilder } = require('discord.js')

module.exports = ({ client, inter }) => {
    inter.message.edit({
        components: inter.message.components.map(
            arow => new ActionRowBuilder().addComponents(
                arow.components.map(b => ButtonBuilder.from(b).setDisabled(true))
            )
        )
    })

    // show loading "animation"
    let loaded = false
    const interval = setInterval(() => {
        if(loaded) return clearInterval(interval)
        const n = Math.floor(Date.now() / 1000) % 5 + 1
        inter.editReply(`Translating${'.'.repeat(n)}`)
    }, 1000)

    //TODO: change pseudocode out
    setTimeout(() => { loaded = true }, 10e3)

    //TODO: implement translation
    const { channelId, messageId } = inter.message.reference
    const originalMessage = inter.guild.channels.cache.get(channelId)?.messages.cache.get(messageId)
    if(!originalMessage) return inter.editReply('Error parsing original message!')
    originalMessage.reply('Translate deez nuts!')

}