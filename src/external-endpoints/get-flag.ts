const getFlagUrl = require("../api-handling/flag-handling");
const getCountry = require("../database-handling/get-country");
const getRandomCountry = require("../internal-endpoints/get-random-country");

const getFlag = async () => {
  try {
    const randomCountry = await getRandomCountry(); // Fetching country data

    const myCountryCode: string = randomCountry.code; // Example country code
    console.log(myCountryCode);
    const flagObject: { url: any } = await getFlagUrl(myCountryCode); // Adjust the type based on actual response structure
    console.log(flagObject.url);
  } catch (error) {
    console.error("Error fetching flag:", error);
  }
};

getFlag();
