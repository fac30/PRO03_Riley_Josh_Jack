const getFlagURL = require("./api-handling/flag-handling");
const getOpenAIReponse = require("./api-handling/openAI-handling");
const getRandomCountry = require("./internal-endpoints/get-random-country");
const changeDatabase = require("./database-handling/change-database");

const express = require("express");

const app = express();
app.use(express.json()); // To parse JSON bodies

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

let currentCountry: string | null = null;
let userScore = 0;

const handleScoreChange = (isCorrect: boolean) => {
  isCorrect ? userScore++ : userScore--;
};

let database = changeDatabase("europe");
console.log(database);

app.post("/continents", (req: any, res: any) => {
  const newContinent = req.body.newContinent;
  console.log(newContinent);
  database = changeDatabase(newContinent);
  res.json({ newContinent });
});

app.get("/question", async (req: any, res: any) => {
  const myRandomCountryObject = await getRandomCountry(database);
  currentCountry = myRandomCountryObject.country;

  const flagURL = await getFlagURL(myRandomCountryObject.code);
  const aiResponse = await getOpenAIReponse(myRandomCountryObject.country);
  console.log(`THE FLAG URL IS ${flagURL}, THE AI RESPONSE IS ${aiResponse}`);
  res.json({ flagURL, aiResponse, currentCountry, database });

  // console.log("Question endpoint hit");
});

// POST endpoint to check the user's answer
app.post("/answer", async (req: any, res: any) => {
  const userAnswer = req.body.answer;

  if (currentCountry === null) {
    return;
  }

  // Compare the user's answer with the stored random country
  const isCorrect = userAnswer.toLowerCase() === currentCountry.toLowerCase();

  handleScoreChange(isCorrect);

  // Send a response indicating whether the answer is correct
  res.json({
    isCorrect,
    correctAnswer: currentCountry,
    "your score:": userScore,
  });
});

export {};
