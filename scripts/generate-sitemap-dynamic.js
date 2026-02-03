// scripts/generate-sitemap-dynamic.js
// Generate sitemap with real blog data from Supabase

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://olcabtjsennqhogmozue.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sY2FidGpzZW5ucWhvZ21venVlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjcwNzAxNTUsImV4cCI6MjA4MjY0NjE1NX0.6GMAtIPx64L-Z3dr8smXBqM8wOvGn5QEU_TyUAwpzIM';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const siteUrl = 'https://www.adventurousinvestorhub.com';

const staticPages = [
  { path: '', priority: 1.0, changefreq: 'weekly' },
  { path: 'watch-read', priority: 0.9, changefreq: 'weekly' },
  { path: 'explore-ai', priority: 0.9, changefreq: 'weekly' },
  { path: 'other-projects', priority: 0.8, changefreq: 'monthly' },
];

async function generateSitemap() {
  let urls = [];
  const today = new Date().toISOString().split('T')[0];

  // Add static pages
  staticPages.forEach(page => {
    const cleanPath = page.path ? `/${page.path}` : '';
    urls.push({
      loc: `${siteUrl}${cleanPath}`,
      lastmod: today,
      changefreq: page.changefreq,
      priority: page.priority,
    });
  });

  try {
    // Fetch published blogs from Supabase
    const { data: blogs, error } = await supabase
      .from('content_blogs')
      .select('slug, publish_date, created_at')
      .eq('is_published', true)
      .order('publish_date', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
    } else if (blogs && blogs.length > 0) {
      // Add blog articles
      blogs.forEach(blog => {
        const lastmod = blog.publish_date || blog.created_at || today;
        urls.push({
          loc: `${siteUrl}/blog/${blog.slug}`,
          lastmod: lastmod.split('T')[0],
          changefreq: 'monthly',
          priority: 0.8,
        });
      });
      console.log(`Added ${blogs.length} blog posts to sitemap`);
    }
  } catch (err) {
    console.error('Failed to fetch blogs:', err);
  }

  // Generate XML
  const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Write to file
  const outputPath = path.join(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(outputPath, sitemapXml);
  console.log(`✅ Sitemap generated with ${urls.length} URLs at ${outputPath}`);
}

generateSitemap().catch(console.error);
