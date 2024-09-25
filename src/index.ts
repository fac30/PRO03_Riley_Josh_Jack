const indexFlagRequest = require("./api-handling/flag-handling");
const openAiResponse = require("./api-handling/openAI-handling");
const getRandomCountryIndex = require("./internal-endpoints/get-random-country");

const express = require("express");

// endpoint requests random Country
// recieves namee flag & fact

const app = express();

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.get("/question", async (req: any, res: any) => {
  const myRandomCountryObject = await getRandomCountryIndex();
  const flag = await indexFlagRequest(myRandomCountryObject.code);
  const aiResponse = await openAiResponse(myRandomCountryObject.country);
  console.log(`THE FLAG URL IS ${flag}, THE AI RESPONSE IS ${aiResponse}`);
  res.json({ flag, aiResponse });

  // console.log("Question endpoint hit");
});
