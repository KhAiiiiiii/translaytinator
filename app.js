const axios = require('axios');
require('dotenv').config();  // Load environment variables from .env
const apiKey = process.env.GROQ_API_KEY;
if (!apiKey) {
    console.error("API key is missing. Please check your .env file.");
    process.exit(1);
}
async function translateSlang(slangText) {
    try {
        const groqData = {
            "model": "llama3-8b-8192",
            "messages": [
                {
                    "role": "user",
                    "content": slangText
                }
            ],
            "max_tokens": 1250,
            "top_p": 1,
            "stream": false,
            "stop": null
        };
        const response = await axios.post('https://api.groq.com/v1/chat/completions', groqData, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        const translation = response.data.choices[0].message.content;
        console.log('Translation:', translation);

    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
    }
}


