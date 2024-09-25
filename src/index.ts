const dotenv = require("dotenv");
const express = require("express");
const { createClient } = require("@supabase/supabase-js");

const supabaseURL: string = process.env.SUPABASE_URL ?? "";
const supabaseKey: string = process.env.SUPABASE_KEY ?? "";
const supabase = createClient(supabaseURL, supabaseKey);

const app = express();

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
