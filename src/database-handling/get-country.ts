const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
dotenv.config();

const supabaseURL: string = process.env.SUPABASE_URL ?? "";
const supabaseKey: string = process.env.SUPABASE_KEY ?? "";
// console.log(supabaseURL, supabaseKey);

const supabase = createClient(supabaseURL, supabaseKey);

const getCountry = async () => {
  const { data } = await supabase.from("countries").select();

  const countryObject = {
    country: data[0].country,
    code: data[0].code,
  };

  console.log(countryObject);

  return countryObject;
};

module.exports = getCountry;

export {};
