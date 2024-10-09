const loadSecrets = require("../secrets/secrets-handler");
const OpenAI = require("openai");

// Load secrets and create the OpenAI instance
const initializeOpenAI = async () => {
  const { openAIKey } = await loadSecrets();

  const openai = new OpenAI({
    apiKey: openAIKey,
  });

  return openai;
};

const getOpenAIResponse = async (country: string) => {
  const openai = await initializeOpenAI();
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Give me a fun fact about ${country}.`,
      },
    ],
    model: "gpt-4o",
  });

  return completion.choices[0].message.content;
};

module.exports = { getOpenAIResponse };

export {};
