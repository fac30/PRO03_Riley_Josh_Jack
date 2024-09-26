# PRO03_Riley_Josh_Jack

https://tapmaprevenge.atlassian.net/jira/software/projects/KAN/boards/1

---
# openAi-handling.ts

```markdown
# OpenAI Country Facts and Distance Script

This script leverages the OpenAI API to provide two functionalities: retrieving a fun fact about a specific country and calculating the distance between two countries. The script is implemented in Node.js and uses the `dotenv` package to manage environment variables for sensitive information like API keys.

## Code Explanation

### 1. Required Modules

```javascript
const OpenAI = require("openai");
const dotenv = require("dotenv");
dotenv.config();
```
- **OpenAI**: This module is used to interact with the OpenAI API.
- **dotenv**: This package loads environment variables from a `.env` file into `process.env`. It’s particularly useful for managing sensitive information like API keys.

### 2. Initializing the OpenAI Client

```javascript
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Get the API key from the environment variable
});
```
- This code creates an instance of the OpenAI API client. The API key is fetched from the environment variable `OPENAI_API_KEY`, which should be defined in the `.env` file.

### 3. Function: Get a Fun Fact About a Country

```javascript
async function getOpenAIReponse(country: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Give me a fun fact about ${country}. Do not send any text other than the fact (e.g. sure!, can do! or ok!) Only refer to the country as 'this country'`,
      },
    ],
    model: "gpt-4o", 
  });
  return completion.choices[0].message.content;
}
```
- **Function Purpose**: This asynchronous function retrieves a fun fact about a specified country.
- **Parameters**: 
  - `country`: A string representing the name of the country.
- **Process**:
  - It sends a request to the OpenAI chat completions API with a system message instructing the model to return only a fun fact about the country.
  - The model is instructed to avoid any extra text and only refer to the country as "this country".
- **Return Value**: The function returns the fun fact as a string.

### 4. Function: Get Distance Between Two Countries

```javascript
async function getDistance(country: string, country2: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system", 
        content: `what is the distance between ${country} and ${country2} in km. Do not send any text other than the fact (e.g. sure!, can do! or ok!) Only refer to the country as 'this country'`,
      },
    ],
    model: "gpt-4o", 
  });
  return completion.choices[0].message.content;
}
```
- **Function Purpose**: This asynchronous function calculates the distance between two specified countries.
- **Parameters**: 
  - `country`: A string representing the name of the first country.
  - `country2`: A string representing the name of the second country.
- **Process**:
  - Similar to the previous function, it sends a request to the OpenAI chat completions API with a system message requesting the distance between the two countries.
  - The model is instructed to provide the distance in kilometers and avoid any additional text.
- **Return Value**: The function returns the calculated distance as a string.

### 5. Exporting Functions

```javascript
module.exports = {
  getOpenAIReponse, 
  getDistance, 
};

export {};
```
- This part of the code exports the `getOpenAIReponse` and `getDistance` functions so that they can be used in other modules/files.

## Environment Variables

To use this script, you need to set up an environment variable for your OpenAI API key. Create a `.env` file in the root directory of your project with the following content:

```
OPENAI_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual OpenAI API key.

## Dependencies

- **openai**: A client library for interacting with the OpenAI API.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file into `process.env`.

## Example Usage

Here’s how you can use the exported functions in another file:

```javascript
const { getOpenAIReponse, getDistance } = require('./path/to/your/script');

(async () => {
  const funFact = await getOpenAIReponse('Italy');
  console.log(`Fun Fact: ${funFact}`);

  const distance = await getDistance('Italy', 'Greece');
  console.log(`Distance: ${distance} km`);
})();
```



# index.ts



## Dependencies

This API relies on the following modules:
- `getFlagURL`: Retrieves the flag URL for a country based on its country code.
- `getOpenAIResponse` and `getDistance`: Uses OpenAI's API to provide country-related information and calculate the distance between two countries.
- `getRandomCountry`: Fetches a random country object including its name and code.
- `changeDatabase`: Handles switching between different continent-specific country databases.

### Import Statements:
```javascript
const getFlagURL = require("./api-handling/flag-handling");
const { getOpenAIReponse, getDistance } = require("./api-handling/openAI-handling");
const getRandomCountry = require("./internal-endpoints/get-random-country");
const changeDatabase = require("./database-handling/change-database");
```

## Configuration

- The server uses `express.js` and listens on a configurable port, which defaults to **3000** if the environment variable `PORT` is not set.

```javascript
const express = require("express");
const app = express();
app.use(express.json());

const PORT: number = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
```

## Endpoints

### POST `/continents`

This endpoint allows switching the current country database by selecting a different continent. The initial continent is set to **Europe** by default.

- **Request Body**:
  ```json
  {
    "newContinent": "continent_name"
  }
  ```
  - `newContinent`: Specifies the continent (e.g., "Asia", "Africa", "Europe", etc.).

- **Response**:
  Returns the selected continent as confirmation.
  
  ```json
  {
    "newContinent": "Europe"
  }
  ```

- **Example**:
  ```bash
  curl -X POST http://localhost:3000/continents \
    -H "Content-Type: application/json" \
    -d '{"newContinent": "Asia"}'
  ```

#### Code Example:
```javascript
app.post("/continents", (req: any, res: any) => {
  const newContinent = req.body.newContinent;
  database = changeDatabase(newContinent);
  res.json({ newContinent });
});
```

### GET `/question`

Retrieves a random country from the current continent database, along with its flag and a related fact from OpenAI. This endpoint also stores the selected country for validation in the `/answer` endpoint.

- **Response**:
  - `flagURL`: The URL of the country's flag.
  - `aiResponse`: A random fact generated by OpenAI about the country.
  - `currentCountry`: The name of the selected country.
  - `database`: The current continent from which the country was selected.

- **Example**:
  ```bash
  curl http://localhost:3000/question
  ```

  ```json
  {
    "flagURL": "https://example.com/flags/country.png",
    "aiResponse": "This country has beautiful landscapes.",
    "currentCountry": "France",
    "database": "Europe"
  }
  ```

#### Code Example:
```javascript
app.get("/question", async (req: any, res: any) => {
  const myRandomCountryObject = await getRandomCountry(database);
  currentCountry = myRandomCountryObject.country;
  const flagURL = await getFlagURL(myRandomCountryObject.code);
  const aiResponse = await getOpenAIReponse(myRandomCountryObject.country);

  res.json({ flagURL, aiResponse, currentCountry, database });
});
```

### POST `/answer`

This endpoint allows the user to submit an answer for the current trivia question. It compares the user's guess with the correct country and provides feedback based on the distance between the guessed country and the actual country.

- **Request Body**:
  ```json
  {
    "answer": "guessed_country_name"
  }
  ```

- **Response**:
  - `isCorrect`: Whether the user's guess was correct (boolean).
  - `correctAnswer`: The actual country name.
  - `yourGuessDistance`: The geographical distance between the guessed and correct country.
  - `userScore`: The user's updated score after the answer is processed.

- **Example**:
  ```bash
  curl -X POST http://localhost:3000/answer \
    -H "Content-Type: application/json" \
    -d '{"answer": "Germany"}'
  ```

  ```json
  {
    "isCorrect": false,
    "correctAnswer": "France",
    "yourGuessDistance": "Your guess was 500km from the correct location",
    "userScore": -1
  }
  ```

#### Code Example:
```javascript
app.post("/answer", async (req: any, res: any) => {
  const userAnswer = req.body.answer;

  if (currentCountry === null) {
    return res.status(400).json({ error: "No question has been asked yet." });
  }

  const isCorrect = userAnswer.toLowerCase() === currentCountry.toLowerCase();
  const distance = await getDistance(currentCountry, userAnswer);
  handleScoreChange(isCorrect);

  res.json({
    isCorrect,
    correctAnswer: currentCountry,
    yourGuessDistance: `Your guess was ${distance} from the correct location`,
    userScore,
  });
});
```

## Internal Logic

### Score Handling

The score is managed internally and is adjusted based on the user's answer:
- **Correct Answer**: Increments the score by 1.
- **Incorrect Answer**: Decrements the score by 1.

#### Code Example:
```javascript
let userScore = 0;

const handleScoreChange = (isCorrect: boolean) => {
  isCorrect ? userScore++ : userScore--;
};
```


### Country Database

The country database is initialized with **Europe** by default but can be switched using the `/continents` endpoint.

#### Code Example:
```javascript
let database = changeDatabase("europe"); // Default database is set to Europe
```



