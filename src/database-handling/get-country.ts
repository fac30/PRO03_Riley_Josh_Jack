const { createClient } = require("@supabase/supabase-js");
const getSecret = require("../aws/aws-secret");

// THIS NOW WORKS???
// const dotenv = require("dotenv");
// dotenv.config();

let supabaseURL: string;

let supabaseKey: string;

const secret_name = "server_secret";

const client = new SecretsManagerClient({
  region: "eu-west-2",
});

// Use the secret in an async IIFE
const getCountries = async () => {
  try {
    const secret = await getSecret(); // Call the function to retrieve the secret
    supabaseURL = secret.SUPABASE_URL; // Access the URL from the secret
    supabaseKey = secret.SUPABASE_KEY; // Access the key from the secret

    // Initialize Supabase client after the secrets are retrieved
    const supabase = createClient(supabaseURL, supabaseKey);

    const { data } = await supabase.from("all_countries").select("*");
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error using secret:", error);
  }
};

module.exports = getCountries; // Export the getCountries function

export {};
