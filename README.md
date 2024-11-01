# CC0002: Navigating the Digital World Project (T38 Group 9)

#### Built With
![](https://skillicons.dev/icons?i=nodejs,discordjs)
## Introduction
In Singapore, like many other places, generational gaps in communication can be quite pronounced due to the different slang adopted by the younger and older generations. The evolution of language, facilitated by globalization, has led to different generations using distinct slang and terms. This may cause feelings of disconnect between these two groups of people. Terms commonly used among Gen Z such as "slay", "lit", and "flex" may seem foreign to the older ones in our community. These terms also tend to evolve and go out of trend too quickly for older people to catch up. Conversely, younger people might find older expressions, influenced by various dialects, to be outdated or less relatable. The informal and playful nature of Gen Z slang contrasts with the traditional language spoken by the older generation. This may lead to miscommunications, especially in a professional setting. This is illustrated by the poll conducted by the National Youth Council in 2022. Half the respondents agree that intergenerational differences are a growing social issue in Singapore. 2 in 5 respondents also believed that such intergenerational gaps could affect workplace relationships and hinder Singapore's progress as a nation. This shows that generational differences in communication can affect team dynamics and efficiency in a professional setting. Such language gaps may even be present among educators and students, should they not be on the same page linguistically. On a meta scale, such a generational divide in language may even lead to feelings of alienation amongst the different groups of people. As a multicultural society, it's crucial for Singaporeans to recognize that language is key to maintaining our diversity. As such, there is a need to minimize such communication barriers that disrupt our social harmony.

## Getting Started
To run this project locally, you will need to install Node.js on your computer. For a comprehensive guide on how to install Node.js, please click on [this link.](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)

Additionally, you should also have Git installed. Click [this link](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git#Installing) to learn how to install Git on your local machine.

## Installation
1. Clone this repository
   ```
   git clone https://github.com/KhAiiiiiii/translaytinator.git
   ```
2. Install the necessary dependencies
   ```
   npm install
   ```
3. Create a `.env` file in the base directory. Enter your Discord Bot token and Groq API key
   ```
   GROQ_API_KEY="your groq api key here"
   discord_token="your Discord bot's secret token here"
   ```
4. Start the bot
   ```
   node index.js
   ```

## Usage
The bot currently supports **3** methods of prompting for translation.
1. **Automatic Detection**: For every message it receives, the bot will automatically iterate through the message contents to determine if an interpretation is needed.
2. **Translate from Text**: The `translate_text` command may be used to directly translate a block of text.
3. **Translate from Message**: Alternatively, the `translate_message` command may be used to translate the contents of a message previously sent in the server without needing to copy its contents.