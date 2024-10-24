const { ApplicationCommandOptionType } = require('discord.js')
const { createHash } = require('crypto')
const axios = require('axios')

const { wordleGameEmbedBuilder, wordleAnswerEmbedBuilder, wordleEndEmbedBuilder } = require('../embeds/index.js')

const RANDOM_WORD_API = 'https://random-word-api.herokuapp.com/word'

module.exports = {
    name: 'wordle',
    description: 'Play a derived version of the popular word game Wordle',
    options: [
        {
            name: 'difficulty',
            description: 'Choose length of word to guess',
            type: ApplicationCommandOptionType.Number,
            required: true,
            choices: [
                {
                    name: '4',
                    value: 4
                },
                {
                    name: '5',
                    value: 5
                },
                {
                    name: '6',
                    value: 6
                },
                {
                    name: '7',
                    value: 7
                }
            ]
        },
        {
            name: 'chances',
            description: 'Number of incorrect attempts before game ends (default: length + 1)',
            type: ApplicationCommandOptionType.Integer,
            required: false
        }
    ],

    async execute({ client, inter }) {
        const difficulty = inter.options.getNumber('difficulty')
        const chances = inter.options.getInteger('chances') || difficulty + 1
        const answer = (await axios.get(`${RANDOM_WORD_API}?length=${difficulty}`)).data[0]

        const startTime = Date.now()
        const gameHash = createHash('sha256').update(`${startTime}`).digest('hex')

        // Initiate game
        const gameEmbed = wordleGameEmbedBuilder({ client, chances, difficulty, gameHash, player: inter.member })
        await inter.editReply('Wordle game started')
        await inter.channel.send({ embeds: [ gameEmbed ] })

        // Listen for answers
        let tries = 0

        const msgFilter = m => m.author.id === inter.member.id
        const answerCollector = inter.channel.createMessageCollector({ filter: msgFilter, time: 60e4 })
        const start = await inter.channel.send('Type your guesses below (enter \`END_GAME\` to manually end game)')

        // Process answers
        answerCollector.on('collect', async msg => {
            if(msg.content.trim() === 'END_GAME') return answerCollector.stop(false)

            if(msg.content.trim().length !== difficulty) return await msg.reply(`That word was ${msg.content.length} letters longs. Please enter a valid ${difficulty}-letter word.`)
            
            tries++
            if(msg.content.trim().toLowerCase() === answer) return answerCollector.stop(true)
            const results = []

            for(let i = 0; i < difficulty; i++) {
                const letter = msg.content[i].toLowerCase()
                if(letter === answer[i]) results.push('🟢')
                else if(answer.slice().split('').indexOf(letter) < 0) results.push('🔴')
                else results.push('🟠')
            }

            const resultEmbed = wordleAnswerEmbedBuilder({ results, guess: msg.content.trim() })
            await msg.reply({ embeds: [ resultEmbed ]})
            if(tries >= chances) return answerCollector.stop(false)
        })

        // Handle game end
        answerCollector.on('end', (collected, won = false) => {
            const endTime = Date.now()
            const endEmbed = wordleEndEmbedBuilder({ client, gameHash, won, answer, tries, chances, startTime, endTime })
            start.reply({ embeds: [ endEmbed ]})
        })
    }
}