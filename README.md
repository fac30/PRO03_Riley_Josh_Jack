# Map Tap Revenge API

Map Tap Revenge is currently an API for an app where the user will be asked to click the location of country on a map.

It is with Node.js and Express that integrates various APIs to provide a fun quiz about countries. Users can interact with the application to learn facts about different countries, view country flags, and test their knowledge. The application uses OpenAI's API to generate fun facts and calculate distances between countries, Supabase to manage country data, and other utility functions to enhance the user experience.

Installation
To get started with the project, follow these steps:

1. Clone the Repository

```js
git clone https://github.com/fac30/PRO03_Riley_Josh_Jack.git
cd PRO03_Riley_Josh_Jack
```

2. Install Dependencies

Ensure you have Node.js installed. Then, install the project dependencies using npm:

```js
npm install
```

3. Set Up Environment Variables

Create a .env file in the root directory of the project and add the following environment variables:

```
OPENAI_API_KEY=your_openai_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
```

4. Start the server

`npm run start`

## Endpoints

- **`GET /question`**

  - **Description**: Retrieves a random country question, including the flag URL and a fun fact about the country.
  - **Response**:
    ```json
    {
      "flagURL": "flag_url",
      "aiResponse": "fun_fact",
      "currentCountry": "country_name",
      "database": "continent_name"
    }
    ```

- **`POST /answer`**

  - **Description**: Submits the user's answer and receives feedback, including whether the answer was correct, the distance to the correct country, and the updated score.

  - **Request Body**:
    ```json
    {
      "answer": "user_guess"
    }
    ```
  - **Response**:
    ```json
    {
      "isCorrect": boolean,
      "correctAnswer": "country_name",
      "yourGuessDistance": "distance_message",
      "userScore": number
    }
    ```

- **`POST /continents`**

  - **Description**: Changes the continent database used for random country generation.

  - **Request Body**: `{ "newContinent": "continent_name" }`
  - **Response**: `{ "newContinent": "continent_name" }`

## API Integrations

- **OpenAI**: Used for generating fun facts and calculating distances between countries.

- **Supabase**: Used for fetching country data based on the selected continent.

- **FlagsAPI**: Retrieves URLs of country flags based on country codes.

## Utility Functions

- **`getFlagURL`**: Fetches the URL of a country’s flag.

- **`getOpenAIReponse`**: Retrieves a fun fact about a country from OpenAI.

- **`getDistance`**: Calculates the distance between two countries.

- **`getRandomCountry`**: Fetches a random country from the database based on the selected continent.

- **`changeDatabase`**: Switches the country database to a new continent.
