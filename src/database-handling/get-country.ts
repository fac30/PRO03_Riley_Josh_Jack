const { getSecret } = require("../aws/aws-secret");
const { supabaseKeyDotenv, supabaseURLDotenv } = require("../dotenv/dotenv");
const { dbRequest } = require("./db-request");

let supabaseURL: string;

let supabaseKey: string;

// Use the secret in an async IIFE
const getCountries = async () => {
  if (process.env.USE_AWS_SECRETS === "true") {
    try {
      const secret = await getSecret(); // Call the function to retrieve the secret
      supabaseURL = secret.SUPABASE_URL; // Access the URL from the secret
      supabaseKey = secret.SUPABASE_KEY; // Access the key from the secret

      // Initialize Supabase client after the secrets are retrieved
      const myData = await dbRequest(supabaseURL, supabaseKey);
      console.log(myData);
      return myData;
    } catch (error) {
      console.error("Error using secret:", error);
    }
  } else {
    supabaseURL = supabaseURLDotenv;
    supabaseKey = supabaseKeyDotenv;
    const myData = await dbRequest(supabaseURL, supabaseKey);
    console.log(myData);
    return myData;
  }
};

module.exports = getCountries; // Export the getCountries function

export {};
