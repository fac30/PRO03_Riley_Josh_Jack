const getFlagURL = require("./api-handling/flag-handling");
const getOpenAIReponse = require("./api-handling/openAI-handling");
const getRandomCountry = require("./internal-endpoints/get-random-country");

const express = require("express");

// endpoint requests random Country
// recieves namee flag & fact

const app = express();

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/question", async (req: any, res: any) => {
  const myRandomCountryObject = await getRandomCountry();
  const flagURL = await getFlagURL(myRandomCountryObject.code);
  const aiResponse = await getOpenAIReponse(myRandomCountryObject.country);
  console.log(`THE FLAG URL IS ${flagURL}, THE AI RESPONSE IS ${aiResponse}`);
  res.json({ flagURL, aiResponse });

  // console.log("Question endpoint hit");
});

export {};
