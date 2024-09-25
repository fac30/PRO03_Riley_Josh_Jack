// Import the getCountry function from the database-handling module
const getCountry = require("../database-handling/get-country");

// Helper function to generate a random number between 0 and 197 (198 countries in total)
const getRandomNumber = (): number => {
  return Math.floor(Math.random() * 198); // Generate a random integer between 0 and 197
};

// Asynchronous function that returns a random country object (name and country code)
const getRandomCountry = async (): Promise<{
  country: string; // Name of the country
  code: string; // Country code (e.g., "US" for the United States)
}> => {
  try {
    // Get a random number representing a country
    const randomNumber: number = getRandomNumber();

    // Fetch the country details (name and code) from the database using the random number
    const randomCountry = await getCountry(randomNumber);

    // Ensure that a valid country object is returned
    if (!randomCountry || !randomCountry.country || !randomCountry.code) {
      throw new Error("Invalid country data returned from database");
    }

    // Return the fetched country object
    return randomCountry;
  } catch (error) {
    // Log the error for debugging
    console.error("Error fetching random country:", error);

    // You can either throw the error to let the calling function handle it
    throw new Error("Failed to retrieve random country");

    // Or, you could return a fallback country object
    // return { country: "Unknown", code: "XX" };
  }
};

// Export the getRandomCountry function for use in other modules
module.exports = getRandomCountry;
