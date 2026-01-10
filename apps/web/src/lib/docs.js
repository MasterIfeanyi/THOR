import fs from "fs";
import path from "path";

const CONTENT_PATH = path.join(
    process.cwd(), 
    "src",
    "app",
    "(docs)",
    "content"
);

export function getDocsTree() {

  // Check if content directory exists
  if (!fs.existsSync(CONTENT_PATH)) {
    console.warn("Content directory not found:", CONTENT_PATH);
    
    const parentDir = path.dirname(CONTENT_PATH);
    if (fs.existsSync(parentDir)) {
      console.log("Parent directory contents:", fs.readdirSync(parentDir));
    }
    return [];
  }
  function walk(dir) {

    const files = fs.readdirSync(dir);

    const items = files.map((file) => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        return {
          type: "folder",
          name: file,
          children: walk(fullPath),
        };
      }


      if (file.endsWith(".mdx")) {
        const relativePath = path.relative(CONTENT_PATH, fullPath);
        const route = `/${relativePath.replace(/\\/g, "/").replace(/\.mdx$/, "")}`;
        return {
          type: "file",
          name: file.replace(".mdx", ""),
          path: route,
          route: route,
        };
      }

      return null;

    }).filter(Boolean);

    return items.sort((a, b) => {
        // folders take priority over files in the Sidebar link
      if (a.type !== b.type) {
        return a.type === "folder" ? -1 : 1;
      }
      // sort by name for files
      return a.name.localeCompare(b.name);
    });
  }

  return walk(CONTENT_PATH);
}
