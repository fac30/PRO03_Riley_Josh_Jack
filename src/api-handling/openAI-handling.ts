const OpenAI = require("openai");
const dotenv = require("dotenv");
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

dotenv.config();

const requiredEnvVars = ["OPENAI_API_KEY", "SUPABASE_KEY", "SUPABASE_URL"];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

let openAIKey:string;

if (missingEnvVars.length > 0) {
  const secret_name = "server_secret";

  const client = new SecretsManagerClient({
    region: "eu-west-2",
  });

  // Define a function to get the secret
  async function getSecret() {
    let response;

    try {
      response = await client.send(
        new GetSecretValueCommand({
          SecretId: secret_name,
          VersionStage: "AWSCURRENT", // VersionStage defaults to AWSCURRENT if unspecified
        })
      );

      // Parse the SecretString to get the actual secret
      const secret = JSON.parse(response.SecretString);
      return secret; // Return the secret
    } catch (error) {
      console.error("Error retrieving secret:", error);
      throw error; // Re-throw to handle it later
    }
  }

  // Use the secret in an async IIFE
  (async () => {
    try {
      const secret = await getSecret(); // Call the function to retrieve the secret
      const apiKey = secret.OPENAI_API_KEY; // Access the API key from the secret
      console.log(apiKey); // Use the API key as needed
      openAIKey = apiKey;
      
    } catch (error) {
      console.error("Error using secret:", error);
    }
  })();
}

// const openai = new OpenAI({
//   apiKey: openAIKey, // Get the API key from the environment variable
// });

// async function getOpenAIReponse(country: string) {
//   const completion = await openai.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: `Give me a fun fact about ${country}. Do not send any text other than the fact (e.g. sure!, can do! or ok!) Only refer to the country as 'this country'`,
//       },
//     ],
//     model: "gpt-4o",
//   });

//   return completion.choices[0].message.content;
// }

// async function getDistance(country: string, country2: string) {
//   const completion = await openai.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content: `what is the distance between ${country} and ${country2} in km. Do not send any text other than the fact (e.g. sure!, can do! or ok!) Only refer to the country as 'this country'`,
//       },
//     ],
//     model: "gpt-4o",
//   });

//   return completion.choices[0].message.content;
// }

// module.exports = {
//   getOpenAIReponse,
//   getDistance,
// };

// export {};
