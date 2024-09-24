"use strict";
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
dotenv.config();
const supabaseURL = process.env.SUPABASE_URL ?? "";
const supabaseKey = process.env.SUPABASE_KEY ?? "";
// console.log(supabaseURL, supabaseKey);
const supabase = createClient(supabaseURL, supabaseKey);
const getCountry = async () => {
    const { data } = await supabase.from("countries").select();
    //   console.log(data);
    //   console.log(data[0].country);
    return data[0].country;
};
module.exports = getCountry;
