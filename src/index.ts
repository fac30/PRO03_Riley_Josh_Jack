const getRandomFact = require("./external-endpoints/get-fact");
const {
  getOpenAIReponse,
  getDistance,
} = require("./api-handling/openAI-handling"); // Fetches a country-related response from OpenAI
const getCountries = require("./database-handling/get-countries");

const express = require("express");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT: number = Number(process.env.PORT) || 3000;

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

app.post("/random-fact", getRandomFact);

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
