const axios = require('axios');

const apiKey = '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';
const modelId = 'jusshini/genz_slang_model';

async function translateSlang(text) {
    const response = await axios.post(
        `https://api-inference.huggingface.co/models/${modelId}`,
        { inputs: text },
        { headers: { Authorization: `Bearer ${apiKey}` } }
    );
    return response.data;
}






