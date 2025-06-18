import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

const docsDirectory = path.join(process.cwd(), "docs");

export function getAllDocPaths() {
  function getFiles(dir, basePath = "") {
    const files = [];
    
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        // Skip hidden files and directories
        if (item.startsWith("_") || item.startsWith(".")) continue;
        
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // Recursively get files from subdirectories
          files.push(...getFiles(fullPath, path.join(basePath, item)));
        } else if (item.endsWith(".md")) {
          // Create slug from path
          const slug = path.join(basePath, item.replace(/\.md$/, ""));
          const slugArray = slug.split(path.sep).filter(Boolean);
          
          files.push({
            params: {
              slug: slugArray,
            },
          });
          
          console.log(`Found doc: ${slugArray.join('/')}`); // Debug logging
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error);
    }
    
    return files;
  }
  
  const paths = getFiles(docsDirectory);
  console.log(`Total paths found: ${paths.length}`); // Debug logging
  return paths;
}

export async function getDocData(slug) {
  try {
    const fullPath = path.join(docsDirectory, ...slug) + ".md";
    
    if (!fs.existsSync(fullPath)) {
      throw new Error(`File not found: ${fullPath}`);
    }
    
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const matterResult = matter(fileContents);
    
    // Process markdown to HTML
    const processedContent = await remark()
      .use(gfm)
      .use(html, { sanitize: false })
      .process(matterResult.content);
    
    const contentHtml = processedContent.toString();
    
    return {
      slug,
      contentHtml,
      title: matterResult.data.title || slug[slug.length - 1],
      description: matterResult.data.description || "",
      ...matterResult.data,
    };
  } catch (error) {
    console.error(`Error processing doc ${slug.join('/')}:`, error);
    throw error;
  }
}

export function getDocStructure() {
  function buildStructure(dir, basePath = "") {
    const structure = {};
    
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        // Skip hidden files and directories
        if (item.startsWith("_") || item.startsWith(".")) continue;
        
        const fullPath = path.join(dir, item);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          structure[item] = buildStructure(fullPath, path.join(basePath, item));
        } else if (item.endsWith(".md")) {
          const name = item.replace(/\.md$/, "");
          const docPath = basePath ? path.join(basePath, name) : name;
          structure[name] = docPath.replace(/\\/g, '/'); // Normalize path separators
        }
      }
    } catch (error) {
      console.error(`Error building structure for ${dir}:`, error);
    }
    
    return structure;
  }
  
  return buildStructure(docsDirectory);
}
