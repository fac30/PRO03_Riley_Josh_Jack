const OpenAI = require('openai');

const dotenv = require('dotenv');

// Load environment variables from the .env file
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Get the API key from the environment variable
});


async function main() {
  const completion = await openai.chat.completions.create({
    messages: [{ role: "system", content: "Give me a fun fact about Lithuania" }],
    model: "gpt-4o",
  });

  console.log(completion.choices[0].message.content);
}

main();
