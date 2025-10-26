import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gshgewbxlyxkaooavkxu.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzaGdld2J4bHl4a2Fvb2F2a3h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2OTY3MzksImV4cCI6MjA3NjI3MjczOX0.J0U1tYcYDRYIvzpg3M7pGgwqJW6DaZDSm78Bjw3S0tg';

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and anonymous key are required.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
