const getFlagURL = require("./api-handling/flag-handling"); // Retrieves the flag URL based on a country's code
const {
  getOpenAIReponse,
  getDistance,
} = require("./api-handling/openAI-handling"); // Fetches a country-related response from OpenAI
const getRandomCountry = require("./internal-endpoints/get-random-country"); // Retrieves a random country object, such as its name and code
const changeDatabase = require("./database-handling/change-database"); // Handles switching the country database based on the selected continent

const express = require("express");
const app = express();
app.use(express.json());

const PORT: number = Number(process.env.PORT) || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log that the server has started successfully
});

// Declare variables to store the current country and user score
let currentCountry: string | null = null; // Variable to store the current country; initially set to null
let userScore = 0; // Initialize the user score to 0

// Function to handle score changes based on whether the answer is correct
const handleScoreChange = (isCorrect: boolean) => {
  isCorrect ? userScore++ : userScore--;
};

// Initialize the country database to focus on Europe by default
let database = changeDatabase("europe"); // Switch the country data source to "Europe" by default
console.log(database);

// POST endpoint to allow changing the continent database
app.post("/continents", (req: any, res: any) => {
  // Extract the new continent from the request body
  const newContinent = req.body.newContinent;

  console.log(newContinent);

  // Switch the country database to the new continent & respond with that continent as confirmation
  database = changeDatabase(newContinent);
  res.json({ newContinent });
});

app.get("/question", async (req: any, res: any) => {
  // Get a random country object (name, code, etc.) from the specified continent database
  const myRandomCountryObject = await getRandomCountry(database);
  currentCountry = myRandomCountryObject.country; // Store the country globally

  // Fetch the flag URL for the random country
  const flagURL = await getFlagURL(myRandomCountryObject.code);

  // Get a response from OpenAI related to the random country
  const aiResponse = await getOpenAIReponse(myRandomCountryObject.country);

  // Log the flag URL and AI response for debugging purposes
  console.log(`THE FLAG URL IS ${flagURL}, THE AI RESPONSE IS ${aiResponse}`);

  // Respond with a JSON object containing the flag URL, AI response, the current country, and the database (continent)
  res.json({ flagURL, aiResponse, currentCountry, database });
});

// POST endpoint to check the user's answer
app.post("/answer", async (req: any, res: any) => {
  // Extract the user's answer from the request body
  const userAnswer = req.body.answer;

  // Ensure a country has been set before continuing
  if (currentCountry === null) {
    return res.status(400).json({ error: "No question has been asked yet." }); // If no question has been asked, return an error
  }

  // Compare the user's answer (case-insensitive) with the stored current country
  const isCorrect = userAnswer.toLowerCase() === currentCountry.toLowerCase();

  // Calculate the distance between the guessed country and the correct country
  const distance = await getDistance(currentCountry, userAnswer);

  // Update the score based on whether the user's answer was correct
  handleScoreChange(isCorrect);

  // Send a response indicating whether the answer was correct, along with the correct answer, distance, and user's score
  res.json({
    isCorrect, // Whether the user's guess was correct
    correctAnswer: currentCountry, // The correct country
    yourGuessDistance: `Your guess was ${distance} from the correct location`, // Dynamic message with the distance
    userScore, // The user's current score
  });
});

// The export statement is used to avoid conflicts when using the module system in TypeScript
export {};
