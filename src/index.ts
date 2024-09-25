const getFlagURL = require("./api-handling/flag-handling");
const getOpenAIReponse = require("./api-handling/openAI-handling");
const getRandomCountry = require("./internal-endpoints/get-random-country");

const express = require("express");

const app = express();
app.use(express.json()); // To parse JSON bodies

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

let storedRandomCountry: string | null = null;

app.get("/question", async (req: any, res: any) => {
  const myRandomCountryObject = await getRandomCountry();
  storedRandomCountry = myRandomCountryObject.country;

  const flagURL = await getFlagURL(myRandomCountryObject.code);
  const aiResponse = await getOpenAIReponse(myRandomCountryObject.country);
  console.log(`THE FLAG URL IS ${flagURL}, THE AI RESPONSE IS ${aiResponse}`);
  res.json({ flagURL, aiResponse });

  // console.log("Question endpoint hit");
});

// POST endpoint to check the user's answer
app.post("/answer", async (req: any, res: any) => {
  const userAnswer = req.body.answer;

  if (storedRandomCountry === null) {
    return;
  }

  // Compare the user's answer with the stored random country
  const isCorrect =
    userAnswer.toLowerCase() === storedRandomCountry.toLowerCase();

  // Send a response indicating whether the answer is correct
  res.json({
    isCorrect,
    correctAnswer: storedRandomCountry,
  });
});

export {};
