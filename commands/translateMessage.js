const { ApplicationCommandOptionType } = require('discord.js')

const { translateSlang } = require('../oracle/llama.js')

const { translationResultEmbedBuilder } = require('../embeds/index.js')

// duplicate from translateText.js
const generationChoices = [
    { name: 'Normal English', value: 'normal' },
    { name: 'Boomer', value: 'boomer' },
    { name: 'Gen X', value: 'gen x' },
    { name: 'Millennial', value: 'millennial' },
    { name: 'Gen Z', value: 'gen z' },
    { name: 'Gen Alpha', value: 'gen alpha' }
]

module.exports = {
    name: 'translate_message',
    description: 'Translate text from message',
    options: [
        {
            name: 'message',
            description: 'Link to message to translate',
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
        await inter.editReply('Parsing message...')
        const messageUrl = inter.options.getString('message')
        const msgUrlRegex = /http(s?):\/\/discord.com\/channels\/\d{19}\/\d{19}\/\d{19}/
        if(!msgUrlRegex.test(messageUrl)) return inter.editReply('Invalid message link')

        const [ , channelId, messageId ] = messageUrl.match(/\d{19}/g)
        const message = await inter.guild.channels.cache.get(channelId)?.messages.fetch(messageId) // use fetch to get uncached messages
        if(!message) return inter.editReply('Error finding message with link provided')

        const toStyle = inter.options.getString('to')
        await inter.editReply('Processing...')
        await inter.channel.sendTyping()

        const prompt = client.config.translationBasePrompt
                        .replace('{0}', message.content)
                        .replace('{1}', `${toStyle} English`)
        const translatedMessage = await translateSlang(prompt)
        await inter.channel.send({ embeds: [ translationResultEmbedBuilder({ translatedText: translatedMessage, originalMessage: message.url }) ] })
        await inter.deleteReply()
    }
}