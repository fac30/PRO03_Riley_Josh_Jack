const { createClient } = require("@supabase/supabase-js");

const dbRequest = async (url: string, key: string) => {
  const supabase = createClient(url, key);
  const { data } = await supabase.from("all_countries").select("*");
  return data;
};

module.exports = dbRequest;
