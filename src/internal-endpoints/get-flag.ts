// internal-endpoints/get-flag.ts
import { getOpenAiFact } from "./openai-api"; // Import your OpenAI handling function

// Function to get the flag URL
export const getFlagUrl = (countryCode: string): string => {
  return `https://flagsapi.com/${countryCode}/flat/64.png`;
};

// Function to fetch a fact about the country
export const getCountryFact = async (countryCode: string): Promise<string> => {
  const flagUrl = getFlagUrl(countryCode);

  // Send request to OpenAI API to generate a fact about the country
  const prompt = `Generate a fun fact about the country represented by the flag at ${flagUrl}.`;

  try {
    const fact = await getOpenAiFact(prompt);
    return fact;
  } catch (error) {
    console.error("Error fetching fact from OpenAI:", error);
    throw new Error("Could not fetch fact");
  }
};
