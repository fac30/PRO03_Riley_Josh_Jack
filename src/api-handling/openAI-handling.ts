const OpenAI = require("openai");

const dotenv = require("dotenv");

// Load environment variables from the .env file
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Get the API key from the environment variable
});

async function main(country: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Give me a fun fact about ${country}. Do not send any text other than the fact (e.g. sure!, can do! or ok!) Start the response with the name of the country in brackets, but then only refer to the country as 'this country'`,
      },
    ],
    model: "gpt-4o",
  });

  return completion.choices[0].message.content;
}

module.exports = main;

export {};
