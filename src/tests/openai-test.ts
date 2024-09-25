const OpenAI = require("openai");

const dotenv = require("dotenv");

// Load environment variables from the .env file
dotenv.config();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY || "";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Get the API key from the environment variable
});

async function getOpenAIReponse() {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `Answer in one word: What is the captital of France`,
      },
    ],
    model: "gpt-4o",
  });

  return completion.choices[0].message.content;
}

// A type-safe function to compare actual and expected results
function equal(actual: string, expected: string): void {
  if (actual === expected) {
    console.info(`Pass: Expected ${expected} and received ${actual}`);
  } else {
    console.error(`Fail: Expected ${expected} but received ${actual} instead`);
  }
}

function test(name: string, testFunction: () => Promise<void>) {
  console.group(name);
  testFunction()
    .then(() => console.groupEnd()) // Ensure the group ends after the test function finishes
    .catch((error) => {
      console.error(`Test failed with error: ${error}`);
      console.groupEnd(); // End the group even if there’s an error
    });
}

// Adjust the test to work with the country-based fun fact
test("Gets the capital of France from OpenAI API", async () => {
  const result = await getOpenAIReponse(); // Asking OpenAI about France
  const expected = "Paris"; // Expecting the capital to be Paris

  equal(result, expected); // Compare result with expected
});

export {};
