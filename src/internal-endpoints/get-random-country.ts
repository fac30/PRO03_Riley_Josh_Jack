// Import the getCountry function from the database-handling module
const getCountry = require("../database-handling/get-country");

// Helper function to generate a random number between 0 and 197 (198 countries in total)
const getRandomNumber = (database: string): number => {
  const maximumNumber: number = getMaxNumber(database);
  console.log(maximumNumber);
  return Math.floor(Math.random() * maximumNumber + 1);
};

const getMaxNumber = (database: string): number => {
  switch (database) {
    case "asia":
      return 47;
    case "europe":
      return 52;
    case "south_america":
      return 13;
    default:
      return 999;
  }
};

// Asynchronous function that returns a random country object (name and country code)
const getRandomCountry = async (
  database: string
): Promise<{
  country: string; // Name of the country
  code: string; // Country code (e.g., "US" for the United States)
}> => {
  // Get a random number representing a country
  const randomNumber: number = getRandomNumber(database);
  console.log(randomNumber);

  // Fetch the country details (name and code) from the database using the random number
  const randomCountry = await getCountry(randomNumber, database);

  // Return the fetched country object
  return randomCountry;
};

// Export the getRandomCountry function for use in other modules
module.exports = getRandomCountry;
