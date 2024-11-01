const { ApplicationCommandOptionType } = require('discord.js')

const { translateSlang } = require('../oracle/llama.js')

const { translationFromEmbedBuilder, translationResultEmbedBuilder } = require('../embeds/index.js')

const generationChoices = [
    { name: 'Normal English', value: 'normal' },
    { name: 'Boomer', value: 'boomer' },
    { name: 'Gen X', value: 'gen x' },
    { name: 'Millennial', value: 'millennial' },
    { name: 'Gen Z', value: 'gen z' },
    { name: 'Gen Alpha', value: 'gen alpha' }
]

module.exports = {
    name: 'translate_text',
    description: 'Translate text directly',
    options: [
        {
            name: 'text',
            description: 'Text to be intepreted',
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'to',
            description: 'Language style of output',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: generationChoices
        }
    ],

    async execute({ client, inter }) {
        const toStyle = inter.options.getString('to')
        const textContent = inter.options.getString('text')
        await inter.editReply('Processing...')
        await inter.channel.sendTyping()
        //const originalTextMessage = await inter.channel.send(`${inter.member}: ${textContent}`)

        // create webhook to spoof user
        const wh = await inter.channel.createWebhook({
            name: inter.member.displayName,
            avatar: inter.member.displayAvatarURL()
        })
        const originalTextMessage = await wh.send({ content: textContent })
        wh.delete()

        const prompt = client.config.translationBasePrompt
                        .replace('{0}', textContent)
                        .replace('{1}', `${toStyle} English`)
        const translatedMessage = await translateSlang(prompt)
        await inter.channel.send({ embeds: [ translationResultEmbedBuilder({ translatedText: translatedMessage, originalMessage: originalTextMessage.url }) ] })
        await inter.deleteReply()
    }
}