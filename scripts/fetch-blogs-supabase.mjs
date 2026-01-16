// scripts/fetch-blogs-supabase.mjs
// Fetch all published blogs from Supabase and output as JSON for sitemap

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://olcabtjsennqhogmozue.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sY2FidGpzZW5ucWhvZ21venVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwNzAxNTUsImV4cCI6MjA4MjY0NjE1NX0.6GMAtIPx64L-Z3dr8smXBqM8wOvGn5QEU_TyUAwpzIM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const { data, error } = await supabase
  .from('content_blogs')
  .select('slug,publish_date')
  .eq('is_published', true)
  .order('publish_date', { ascending: false });

if (error) {
  console.error('Error fetching blogs:', error);
  process.exit(1);
}

fs.writeFileSync('./blogs.json', JSON.stringify(data, null, 2));
console.log('Fetched blogs written to blogs.json');
