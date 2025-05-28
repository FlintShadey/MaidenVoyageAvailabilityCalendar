import { createClient } from "@supabase/supabase-js";

// Supabase project URL and anon key
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if Supabase is properly configured
export const isSupabaseConfigured =
  supabaseUrl &&
  supabaseUrl !== "your-project-url-here" &&
  supabaseUrl.startsWith("https://") &&
  supabaseAnonKey &&
  supabaseAnonKey !== "your-anon-key-here";

if (!isSupabaseConfigured) {
  console.warn("⚠️ Supabase not configured properly");
  console.log(
    "📝 The app will run in demo mode. See SUPABASE_SETUP.md for database setup instructions."
  );
}

// Create Supabase client only if properly configured, otherwise null
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database table structure (for reference):
/*
CREATE TABLE user_availability (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(50) NOT NULL,
  selected_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_name, selected_date)
);

-- Enable Row Level Security
ALTER TABLE user_availability ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations for now (you can make this more restrictive later)
CREATE POLICY "Allow all operations for user_availability" ON user_availability
FOR ALL USING (true);

-- Create an index for performance
CREATE INDEX idx_user_availability_user_date ON user_availability(user_name, selected_date);
CREATE INDEX idx_user_availability_date ON user_availability(selected_date);
*/
