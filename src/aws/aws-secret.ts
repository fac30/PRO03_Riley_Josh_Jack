const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

const dotenv = require("dotenv");
dotenv.config();

const secret_name = "server_secret";

const client = new SecretsManagerClient({
  region: "eu-west-2",
});

// Define a function to get the secret
async function getSecret() {
  let supabaseURL: string;
  let supabaseKey: string;
  let openAIKey: string;
  if (process.env.USE_AWS_SECRETS === "true") {
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
      supabaseURL = secret.SUPABASE_URL; // Access the URL from the secret
      supabaseKey = secret.SUPABASE_KEY; // Access the key from the secret
      openAIKey = secret.OPENAI_API_KEY;
    } catch (error) {
      console.error("Error retrieving secret:", error);
      throw error; // Re-throw to handle it later
    }
  } else {
    supabaseURL = process.env.SUPABASE_URL || "supabseurlmissing";
    supabaseKey = process.env.SUPABASE_KEY || "supabasekeymissing";
    openAIKey = process.env.OPENAI_API_KEY || "openaikeymissing";
  }
  return { supabaseURL, supabaseKey, openAIKey };
}

module.exports = { getSecret };

export {};
