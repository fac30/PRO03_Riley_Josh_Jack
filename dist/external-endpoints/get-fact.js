"use strict";
// const { callOpenAI } = require("./api-handling/openAI-handling.ts");
// const { getCountry } = require("./database-handling/get-country.ts");
// export const getCountryFact = async (countryCode: string): Promise<string> => {
//   try {
//     const country = await getCountry();
//     if (!country) {
//       throw new Error("Country not found.");
//     }
//     const flagUrl = getFlagUrl(countryCode);
//     const prompt = `Generate a fun fact about ${country}.`;
//     const fact = await callOpenAI(prompt);
//     return fact;
//   } catch (error) {
//     console.error("Error fetching fact from OpenAI:", error);
//     throw new Error("Could not fetch fact");
//   }
// };
