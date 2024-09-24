// internal-endpoints/get-flag.ts
import { callOpenAI } from "./api-handling/openAI-handling.ts"; // Import your OpenAI handling function

const country = favouriteCountry;

// Function to fetch a fact about the country
export const getCountryFact = async (countryCode: string): Promise<string> => {
  const flagUrl = getFlagUrl(countryCode);

  // Send request to OpenAI API to generate a fact about the country
  const prompt = `Generate a fun fact about ${country}.`;

  try {
    const fact = await callOpenAi(prompt);
    return fact;
  } catch (error) {
    console.error("Error fetching fact from OpenAI:", error);
    throw new Error("Could not fetch fact");
  }
};
