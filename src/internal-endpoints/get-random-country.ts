// Import the getCountry function from the database-handling module
const getCountry = require("../database-handling/get-country");

// Helper function to generate a random number between 0 and 197 (198 countries in total)
const getRandomNumber = (maxNum: number): number => {
  return Math.floor(Math.random() * maxNum); // Generate a random integer between 0 and 197
};

const getDatabaseMax = (database: string): number => {
  switch (database) {
    case "asia":
      return 49;
    case "europe":
      return 44;
    case "south_america":
      return 12;
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
  const maximumNumber: number = await getDatabaseMax(database);
  console.log(maximumNumber);

  // Get a random number representing a country
  const randomNumber: number = getRandomNumber(maximumNumber);

  // Fetch the country details (name and code) from the database using the random number
  const randomCountry = await getCountry(randomNumber, database);

  // Return the fetched country object
  return randomCountry;
};

// Export the getRandomCountry function for use in other modules
module.exports = getRandomCountry;
