const dotenv = require("dotenv");
dotenv.config();

const supabaseKeyDotenv = process.env.SUPABASE_KEY;
const supabaseURLDotenv = process.env.SUPABASE_URL;
const openAIKeyDotEnv = process.env.OPENAI_API_KEY;

module.exports = {
  supabaseKeyDotenv,
  supabaseURLDotenv,
  openAIKeyDotEnv,
};

export {};
