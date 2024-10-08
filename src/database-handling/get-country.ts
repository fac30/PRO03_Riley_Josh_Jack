const { createClient } = require("@supabase/supabase-js");
const getSecret = require("../aws/aws-secret");
const { supabaseKeyDotenv, supabaseURLDotenv } = require("../dotenv/dotenv");

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
      const supabase = createClient(supabaseURL, supabaseKey);

      const { data } = await supabase.from("all_countries").select("*");
      console.log(data);
      return data;
    } catch (error) {
      console.error("Error using secret:", error);
    }
  } else {
    supabaseURL = supabaseURLDotenv;
    supabaseKey = supabaseKeyDotenv;
    const supabase = createClient(supabaseURL, supabaseKey);
    const { data } = await supabase.from("all_countries").select("*");
    console.log(data);
    return data;
  }
};

module.exports = getCountries; // Export the getCountries function

export {};
