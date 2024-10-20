module.exports = {
    userStatus: {
        type: 'Custom',
        status: 'Translating your messages :)'
    },
    aiModel: 'Meta Llama 3 8B',
    datasetUpdateInterval: 86400e3, // update dataset every day
    promptThreshold: 0.4, // treshold of slang detected in a message when bot prompts for translation
    translationBasePrompt: "{0}\nHelp me translate the text above to {1}",
}