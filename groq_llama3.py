from flask import Flask, request, jsonify
import os
import requests
app = Flask(__name__)
api_key = os.getenv("GROQ_API_KEY", "")  
@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    slang = data.get('slang')
    groq_data = { "model": "llama3-8b-8192","messages": [{"role": "user", "content": slang}],"max_tokens": 1250,"top_p": 1,"stream": False,"stop": None}
    headers = {"Authorization": f"Bearer {api_key}","Content-Type": "application/json"}
    response = requests.post("https://api.groq.com/v1/chat/completions", headers=headers, json=groq_data)
    if response.status_code == 200:
        translation = response.json()['choices'][0]['message']['content']
        return jsonify({"translation": translation})
    else:
        return jsonify({"error": "Error fetching translation"}), response.status_code
if __name__ == '__main__':
    app.run(debug=True)
