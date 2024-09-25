// Import required modules and custom handlers
const getFlagURL = require("./api-handling/flag-handling"); // Handles getting the flag URL based on country code
const getOpenAIReponse = require("./api-handling/openAI-handling"); // Handles making an API request to OpenAI for country-related responses
const getRandomCountry = require("./internal-endpoints/get-random-country"); // Retrieves a random country object (name, code, etc.)

const express = require("express");

const app = express();
app.use(express.json()); // To parse JSON bodies

// Set the port for the server to listen on, either from environment variables or default to 3000
const PORT: number = Number(process.env.PORT) || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log message when the server is successfully running
});

let currentCountry: string | null = null;
let userScore = 0;

const handleScoreChange = (isCorrect: boolean) => {
  isCorrect ? userScore++ : userScore--;
};

app.get("/question", async (req: any, res: any) => {
  try {
    const myRandomCountryObject = await getRandomCountry();
    currentCountry = myRandomCountryObject.country;
    const flagURL = await getFlagURL(myRandomCountryObject.code);
    const aiResponse = await getOpenAIReponse(myRandomCountryObject.country);

    console.log(`THE FLAG URL IS ${flagURL}, THE AI RESPONSE IS ${aiResponse}`);
    res.json({ flagURL, aiResponse, currentCountry });
  } catch (error) {
    console.error("Error in /question:", error);
    res.status(500).json({ error: "Failed to fetch question data" });
  }
});

// POST endpoint to check the user's answer
app.post("/answer", async (req: any, res: any) => {
  try {
    const userAnswer = req.body.answer;

    if (!userAnswer || typeof userAnswer !== "string") {
      return res.status(400).json({ error: "Invalid answer format" });
    }

    if (currentCountry === null) {
      return res.status(400).json({ error: "No question has been asked yet" });
    }

    const isCorrect = userAnswer.toLowerCase() === currentCountry.toLowerCase();
    handleScoreChange(isCorrect);

    res.json({
      isCorrect,
      correctAnswer: currentCountry,
      "your score:": userScore,
    });
  } catch (error) {
    console.error("Error in /answer:", error);
    res.status(500).json({ error: "Failed to process answer" });
  }
});

export {};
