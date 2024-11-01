module.exports = {
    userStatus: {
        type: 'Custom',
        status: 'Translating your messages :)'
    },
    aiModel: 'Meta Llama 3 8B',
    datasetUpdateInterval: 86400e3, // update dataset every day
    promptThreshold: 0.1, // treshold of slang detected in a message when bot prompts for translation
    translationBasePrompt: "{0}\nExplain the text above and provide a rephrased sentence in {1}",
}