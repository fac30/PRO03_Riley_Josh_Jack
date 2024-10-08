const getRandomFact = require("./external-endpoints/get-fact");
const {
  getOpenAIReponse,
  getDistance,
} = require("./api-handling/openAI-handling"); // Fetches a country-related response from OpenAI

const getCountries = require("./database-handling/get-country");

const express = require("express");

const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const PORT: number = Number(process.env.PORT) || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log that the server has started successfully
});

app.get("/countries", async (req: any, res: any) => {
  const allCountries = await getCountries();
  res.json({ allCountries });
});

app.post("/random-fact", getRandomFact);

export {};
