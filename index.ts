import { createClient } from '@supabase/supabase-js';

// Replace with your Supabase project URL and public anon key
const supabaseUrl = 'https://your-project-url.supabase.co';
const supabaseKey = 'your-public-anon-key';

const supabase = createClient(supabaseUrl, supabaseKey);

// Example query to fetch data from a table
async function fetchData() {
  const { data, error } = await supabase
    .from('your_table_name')
    .select('*');

  if (error) {
    console.error('Error fetching data:', error);
  } else {
    console.log('Data:', data);
  }
}

fetchData();
