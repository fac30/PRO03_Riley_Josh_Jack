const getRandomFact = require("./external-endpoints/get-fact");
const {
  getOpenAIResponse,
  getDistance,
} = require("./api-handling/openAI-handling"); // Fetches a country-related response from OpenAI
const getCountries = require("./database-handling/get-countries");

const express = require("express");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT: number = 3000;

let allCountries: any[] = [];

// Immediately invoked function to fetch countries when the server starts
(async () => {
  try {
    allCountries = await getCountries();
  } catch (error) {
    console.error("Error fetching countries:", error);
  }
})();

app.get("/countries", async (req: any, res: any) => {
  res.json({ allCountries });
});

// Define the /random-fact route with an inline function
app.get("/random-fact", async (req: any, res: any) => {
  const { country } = req.body;

  if (!country) {
    return res.status(400).json({ error: "Country is required" }); // Handle missing country
  }

  try {
    const fact = await getOpenAIResponse(country); // Fetch the fact using the provided country
    res.json({ fact }); // Send the fact back as a JSON response
  } catch (error) {
    console.error("Error fetching fact:", error);
    res.status(500).json({ error: "Failed to fetch fact" }); // Handle errors and send a response
  }
});

app.listen(PORT, () => {
  let serverType: string = "Unknown";
  if (process.env.USE_AWS_SECRETS === "true") {
    serverType = "AWS";
  } else if (process.env.USE_AWS_SECRETS === "false") {
    serverType = "Dotenv";
  }
  console.log(`Server is running on port ${PORT}: Server type --${serverType}`);
});

export {};
