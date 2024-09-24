const { createClient } = require("@supabase/supabase-js");

const dotenv = require("dotenv");
dotenv.config();
const supabaseURL: string = process.env.SUPABASE_URL ?? "";

const supabaseKey: string = process.env.SUPABASE_KEY ?? "";
// console.log(supabaseURL, supabaseKey);

const supabase = createClient(supabaseURL, supabaseKey);

const getCountry = async (randomNumber: number) => {
  const { data } = await supabase
    .from("countries")
    .select("country, code")
    .eq("id", randomNumber);

  return data[0];
};

module.exports = getCountry;

export {};
