
import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL // Error: Supabase URL is req.
// const supabaseKey = process.env.REACT_APP_ANON_KEY     // Error: Supabase Key is req.

const supabaseUrl = 'https://qtpcpnopgqtdajuwynpi.supabase.co' ;
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0cGNwbm9wZ3F0ZGFqdXd5bnBpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY0MTk3NDUsImV4cCI6MjA1MTk5NTc0NX0.744NXaEQqtWrs3r1T9LyueXLnI5Z_1yqrrUixTmXT_g' ;
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase ;


// 1.  npm install @supabase/supabase-js
// 2. create .env file. (SupaBase URL and Supabase API Key)
// 3. Create Supabase Client. (to access supabase DB)