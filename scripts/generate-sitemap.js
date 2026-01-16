// scripts/generate-sitemap.js
// Node.js script to generate sitemap.xml for all articles and language versions

const fs = require('fs');
const path = require('path');

// Example: Replace with dynamic import from your blog data source
const blogs = [
  {
    slug: 'blog-1',
    lastmod: '2025-12-30',
  },
  // Add more blogs here or import from your DB/content
];

const siteUrl = 'https://www.adventurousinvestorhub.com';
const staticPages = [
  '',
  'watch-read',
  'explore-ai',
];

let urls = [];

// Add static pages
staticPages.forEach(page => {
  urls.push({
    loc: `${siteUrl}/${page}`,
    lastmod: new Date().toISOString().split('T')[0],
    changefreq: 'weekly',
    priority: 1.0,
  });
});

// Add blog articles for both languages
blogs.forEach(blog => {
  ['en', 'hi'].forEach(lang => {
    urls.push({
      loc: `${siteUrl}/blog/${blog.slug}?lang=${lang}`,
      lastmod: blog.lastmod,
      changefreq: 'monthly',
      priority: 0.8,
    });
  });
});

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemapXml);
console.log('Sitemap generated at public/sitemap.xml');
