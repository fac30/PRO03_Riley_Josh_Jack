const getFlagUrl = require("../api-handling/flag-handling");
const getCountry = require("../database-handling/get-country");

(async () => {
  try {
    const country = getCountry(); // Fetching country data

    const myCountry: string = "FR"; // Example country code
    const flagObject: { url: any } = await getFlagUrl(myCountry); // Adjust the type based on actual response structure
    console.log(flagObject.url);
  } catch (error) {
    console.error("Error fetching flag:", error);
  }
})();
