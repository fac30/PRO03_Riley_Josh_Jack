// Import required modules and custom handlers
const getFlagURL = require("./api-handling/flag-handling"); // Handles getting the flag URL based on country code
const getOpenAIReponse = require("./api-handling/openAI-handling"); // Handles making an API request to OpenAI for country-related responses
const getRandomCountry = require("./internal-endpoints/get-random-country"); // Retrieves a random country object (name, code, etc.)

const express = require("express"); // Import Express for creating the server and handling HTTP requests

// Create an instance of the Express application
const app = express();

// Set the port for the server to listen on, either from environment variables or default to 3000
const PORT: number = Number(process.env.PORT) || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log message when the server is successfully running
});

// Define a GET endpoint at '/question'
app.get("/question", async (req: any, res: any) => {
  // Get a random country object (contains country name, code, etc.)
  const myRandomCountryObject = await getRandomCountry();
  
  // Get the flag URL for the country using the country code
  const flagURL = await getFlagURL(myRandomCountryObject.code);
  
  // Get an AI-generated response based on the country name
  const aiResponse = await getOpenAIReponse(myRandomCountryObject.country);
  
  // Log the flag URL and the AI response to the console
  console.log(`THE FLAG URL IS ${flagURL}, THE AI RESPONSE IS ${aiResponse}`);
  
  // Send a JSON response containing the flag URL and AI response
  res.json({ flagURL, aiResponse });

  // Optional: Uncomment to log when the '/question' endpoint is hit
  // console.log("Question endpoint hit");
});

export {};
