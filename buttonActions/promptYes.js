const { ActionRowBuilder, ButtonBuilder } = require('discord.js')

const { translateSlang } = require('../oracle/llama.js')

module.exports = async ({ inter }) => {
    await inter.message.edit({
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

    // Translation
    const { channelId, messageId } = inter.message.reference
    const originalMessage = inter.guild.channels.cache.get(channelId)?.messages.cache.get(messageId)
    if(!originalMessage) return inter.editReply('Error parsing original message!')
        
    const prompt = client.config.translationBasePrompt
                    .replace('{0}', originalMessage.content)
                    .replace('{1}', 'Gen Z slang')
                    .replace('{2}', 'normal English')
    const translatedMessage = await translateSlang(prompt)

    originalMessage.reply(translatedMessage)

    loaded = true
    await inter.message.delete()
    await inter.deleteReply()
}