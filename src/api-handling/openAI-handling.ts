const OpenAI = require("openai");

const dotenv = require("dotenv");

// Load environment variables from the .env file
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Get the API key from the environment variable
});

async function getOpenAIReponse(country: string): Promise<string> {
  // Validate the country input
  if (!country || typeof country !== "string") {
    throw new Error(
      "Invalid country parameter. Please provide a valid country name."
    );
  }

  try {
    // Make the API call to OpenAI
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `Give me a fun fact about ${country}. Do not send any text other than the fact (e.g. sure!, can do! or ok!) Only refer to the country as 'this country'`,
        },
      ],
      model: "gpt-4o",
    });

    // Check if the API response is valid
    if (!completion || !completion.choices || completion.choices.length === 0) {
      throw new Error("No response received from OpenAI API.");
    }

    return completion.choices[0].message.content;
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching response from OpenAI:", error);

    // You can choose to rethrow the error or return a default message
    throw new Error("Failed to retrieve a fun fact from OpenAI.");
  }
}

module.exports = getOpenAIReponse;

export {};
