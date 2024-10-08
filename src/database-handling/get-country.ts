const { createClient } = require("@supabase/supabase-js");
const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");

// THIS NOW WORKS???
// const dotenv = require("dotenv");
// dotenv.config();

let supabaseURL: string = process.env.SUPABASE_URL ?? "";

let supabaseKey: string = process.env.SUPABASE_KEY ?? "";
// // console.log(supabaseURL, supabaseKey);

// const requiredEnvVars = ["OPENAI_API_KEY", "SUPABASE_KEY", "SUPABASE_URL"];
// const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

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
// Use the secret in an async IIFE
(async () => {
  try {
    const secret = await getSecret(); // Call the function to retrieve the secret
    supabaseURL = secret.SUPABASE_URL; // Access the URL from the secret
    supabaseKey = secret.SUPABASE_KEY; // Access the key from the secret

    // Initialize Supabase client after the secrets are retrieved
    const supabase = createClient(supabaseURL, supabaseKey);

    const getCountries = async () => {
      const { data } = await supabase.from("all_countries").select("*");
      console.log(data);
      return data;
    };
    getCountries();
    module.exports = getCountries; // Export the getCountries function

  } catch (error) {
    console.error("Error using secret:", error);
  }
})();


// const getCountry = async (
//   randomNumber: number,
//   database: string
// ): Promise<{ country: string; code: string }> => {
//   const { data } = await supabase
//     .from(database)
//     .select("country, code")
//     .eq("id", randomNumber);

//   return data[0];
// };



export {};
