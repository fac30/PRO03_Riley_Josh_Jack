const { loadSecrets } = require("../secrets/secrets-handler");
const { dbRequest } = require("./db-request");

// Use the secret in an async IIFE
const getCountries = async () => {
  try {
    // Initialize Supabase client after the secrets are retrieved
    const { supabaseURL, supabaseKey } = await loadSecrets();
    const myData = await dbRequest(supabaseURL, supabaseKey);
    console.log(myData);
    return myData;
  } catch (error) {
    console.error("Error using secret:", error);
  }
};

module.exports = getCountries; // Export the getCountries function

export {};
