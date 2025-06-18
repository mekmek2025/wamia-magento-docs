import { getAllDocPaths } from '../lib/docs';

function generateSiteMap(paths) {
  const baseUrl = 'https://mekmek2025.github.io/wamia-magento-docs';
  
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>${baseUrl}</loc>
       <lastmod>${new Date().toISOString()}</lastmod>
       <priority>1.0</priority>
     </url>
     ${paths
       .map(({ params }) => {
         const slug = params.slug.join('/');
         return `
       <url>
           <loc>${baseUrl}/docs/${slug}</loc>
           <lastmod>${new Date().toISOString()}</lastmod>
           <priority>0.8</priority>
       </url>
     `;
       })
       .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }) {
  // Get all documentation paths
  const paths = getAllDocPaths();

  // Generate the XML sitemap
  const sitemap = generateSiteMap(paths);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap; 