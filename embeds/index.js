const path = require('path')
const { readdirSync } = require('fs')

const embeds = {}

const filenames = readdirSync('./embeds', { recursive: true }).filter(f => f !== "index.js" && f.endsWith('.js'))

filenames.forEach(dir => {
    const embed = require(path.join(__dirname, dir))
    Object.assign(embeds, embed)
    delete require.cache[require.resolve(`./${dir}`)]
})

module.exports = embeds