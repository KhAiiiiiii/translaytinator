const axios = require('axios')
const fs = require('fs')

const datasetUrl = 'https://raw.githubusercontent.com/kaspercools/genz-dataset/refs/heads/main/genz_slang.csv'

let currentData = fs.readFileSync('./oracle/dataset.csv', { encoding: 'utf-8' }).split('\n') || []

async function updateDataset(url) {
    try {
        const liveData = (await axios.get(url)).data
        const parsedLiveData = liveData.split('\n').map(l => l.split(',', 1)).slice(1)

        if(currentData.length === parsedLiveData.length) return

        return fs.writeFileSync('./oracle/dataset.csv', parsedLiveData.join('\n'), { encoding: 'utf-8' })
    } catch(e) {
        console.error(e)
    }
}

setInterval(() => {
    updateDataset(datasetUrl)
}, global.client.config.datasetUpdateInterval)

module.exports = { languageDictionary: currentData }