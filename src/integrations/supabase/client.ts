import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://olcabtjsennqhogmozue.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sY2FidGpzZW5ucWhvZ21venVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwNzAxNTUsImV4cCI6MjA4MjY0NjE1NX0.6GMAtIPx64L-Z3dr8smXBqM8wOvGn5QEU_TyUAwpzIM';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
