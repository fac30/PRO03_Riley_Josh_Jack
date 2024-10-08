const { createClient } = require("@supabase/supabase-js");
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

// THIS NOW WORKS???
// const dotenv = require("dotenv");
// dotenv.config();

let supabaseURL: string;

let supabaseKey: string;

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

let getCountries;

// Use the secret in an async IIFE
// Use the secret in an async IIFE
(async () => {
  try {
    const secret = await getSecret(); // Call the function to retrieve the secret
    supabaseURL = secret.SUPABASE_URL; // Access the URL from the secret
    supabaseKey = secret.SUPABASE_KEY; // Access the key from the secret

    // Initialize Supabase client after the secrets are retrieved
    const supabase = createClient(supabaseURL, supabaseKey);

    getCountries = async () => {
      const { data } = await supabase.from("all_countries").select("*");
      console.log(data);
      return data;
    };
    getCountries();
  } catch (error) {
    console.error("Error using secret:", error);
  }
})();

module.exports = getCountries; // Export the getCountries function

export {};
