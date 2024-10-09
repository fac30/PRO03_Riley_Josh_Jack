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
        content: `Give me a fun fact about ${country}. Keep it short, one sentence only, and give me the fun fact without any "sure!", or "ok, here's a secret". E.g. "France is the largest exporter of wine in Europe"`,
      },
    ],
    model: "gpt-4o",
  });

  return completion.choices[0].message.content;
};

module.exports = { getOpenAIResponse };

export {};
