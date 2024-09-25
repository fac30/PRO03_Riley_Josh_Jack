"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { createClient } = require("@supabase/supabase-js");
const dotenv = require("dotenv");
dotenv.config();
const supabaseURL = process.env.SUPABASE_URL ?? "";
const supabaseKey = process.env.SUPABASE_KEY ?? "";
// console.log(supabaseURL, supabaseKey);
const supabase = createClient(supabaseURL, supabaseKey);
const getCountry = async (randomNumber) => {
    const { data } = await supabase
        .from("countries")
        .select("country, code")
        .eq("id", randomNumber);
    console.log(data[0]);
    return data[0];
};
module.exports = getCountry;
