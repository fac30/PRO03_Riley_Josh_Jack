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

const getCountriesFromDB = async () => {
  const allCountries = await getCountries();
  return allCountries;
};

const allCountries = getCountriesFromDB();

app.get("/countries", async (req: any, res: any) => {
  res.json({ allCountries });
});

app.post("/random-fact", getRandomFact);

// Start the server and listen on the specified port
app.listen(PORT, () => {
  let serverType: string = "Unknown";
  if (process.env.USE_AWS_SECRETS === "true") {
    serverType = "AWS";
  } else if (process.env.USE_AWS_SECRETS === "false") {
    serverType = "Dotenv";
  }
  console.log(`Server is running on port ${PORT}: Server type --${serverType}`); // Log that the server has started successfully
});

export {};
