const fs = require('fs');
const path = require('path');

function getAllDocPaths() {
  const docsDirectory = path.join(process.cwd(), 'docs');
  
  function getFiles(dir, basePath = '') {
    const files = [];
    
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        if (item.startsWith('_') || item.startsWith('.')) continue;
        
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          files.push(...getFiles(fullPath, path.join(basePath, item)));
        } else if (item.endsWith('.md')) {
          const slug = path.join(basePath, item.replace(/\.md$/, ''));
          const slugArray = slug.split(path.sep).filter(Boolean);
          files.push(slugArray.join('/'));
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error);
    }
    
    return files;
  }
  
  return getFiles(docsDirectory);
}

function generateSitemap() {
  const baseUrl = 'https://mekmek2025.github.io/wamia-magento-docs';
  const paths = getAllDocPaths();
  
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>1.0</priority>
  </url>
  ${paths
    .map(slug => `
  <url>
    <loc>${baseUrl}/docs/${slug}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <priority>0.8</priority>
  </url>`)
    .join('')}
</urlset>`;

  // Write sitemap to out directory (after Next.js build)
  const outDir = path.join(process.cwd(), 'out');
  if (!fs.existsSync(outDir)) {
    console.error('Out directory does not exist. Make sure to run this after Next.js build.');
    return;
  }
  
  fs.writeFileSync(path.join(outDir, 'sitemap.xml'), sitemap);
  console.log(`Generated sitemap with ${paths.length} pages in out/sitemap.xml`);
}

// Run if called directly
if (require.main === module) {
  generateSitemap();
}

module.exports = { generateSitemap }; 