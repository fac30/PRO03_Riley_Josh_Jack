const OpenAI = require("openai");

const dotenv = require("dotenv");

// Load environment variables from the .env file
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Get the API key from the environment variable
});

async function getOpenAIReponse(country: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Give me a fun fact about ${country}. Do not send any text other than the fact (e.g. sure!, can do! or ok!) Only refer to the country as 'this country'`,
      },
    ],
    model: "gpt-4o",
  });

  return completion.choices[0].message.content;
}

module.exports = getOpenAIReponse;

export {};
