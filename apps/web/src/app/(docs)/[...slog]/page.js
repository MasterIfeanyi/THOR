import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "@/app/_components/MdxComponents";


const CONTENT_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "(docs)",
  "content"
);


// Helper function to find the first MDX file in a directory
function findFirstMdxFile(dir) {
  if (!fs.existsSync(dir)) return null;
  
  const files = fs.readdirSync(dir);
  const mdxFile = files.find(file => file.endsWith('.mdx'));
  
  return mdxFile ? path.join(dir, mdxFile) : null;
}


export default async function DocPage(props) {

    const params = await props.params;
    // Handle when params.slog is undefined (root route)
    const slogArray = params.slog || [];


    // Build the file path from the slog array
    let filePath;

    if (slogArray.length === 0) {

      // If at root, try index.mdx first, then any MDX file in content root
      const indexPath = path.join(CONTENT_PATH, "index.mdx");
      if (fs.existsSync(indexPath)) {
        filePath = indexPath;
      } else {
        filePath = findFirstMdxFile(CONTENT_PATH);
      }

    } else {
      // Try different file path strategies
      const directFile = path.join(CONTENT_PATH, ...slogArray.slice(0, -1), `${slogArray[slogArray.length - 1]}.mdx`);
      const folderPath = path.join(CONTENT_PATH, ...slogArray);
      const indexFile = path.join(folderPath, "index.mdx");

      if (fs.existsSync(directFile)) {
        filePath = directFile;
      } else if (fs.existsSync(indexFile)) {
        filePath = indexFile;
      } else if (fs.existsSync(folderPath) && fs.statSync(folderPath).isDirectory()) {
        // If it's a directory, find the first MDX file in it
        filePath = findFirstMdxFile(folderPath);
      } else {
        filePath = null;
      }

    }


    // Final fallback: if no file found, try to load /content/index.mdx
    if (!filePath || !fs.existsSync(filePath)) {
        const fallbackIndex = path.join(CONTENT_PATH, "index.mdx");
        
        if (fs.existsSync(fallbackIndex)) {
          filePath = fallbackIndex;
        } else {
          // Last resort: find ANY mdx file in content root
          filePath = findFirstMdxFile(CONTENT_PATH);
        }
    }



    if (!filePath || !fs.existsSync(filePath)) {
        
        const dir = filePath ? path.dirname(filePath) : CONTENT_PATH;

        let availableFiles = [];
        
        if (fs.existsSync(CONTENT_PATH)) {
          availableFiles = fs.readdirSync(CONTENT_PATH);
        }

        return (
          <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">Document not found</h1>
              <p className="text-sm text-gray-600 mb-2">
              <strong>Looking for:</strong> {filePath}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Content directory:</strong> {CONTENT_PATH}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Content dir exists:</strong> {fs.existsSync(CONTENT_PATH) ? 'Yes' : 'No'}
            </p>
            {availableFiles.length > 0 && (
              <>
                <p className="text-sm font-semibold mt-4 mb-2">
                    Available files/folders in content directory:
                </p>
                <ul className="list-disc pl-6 text-sm">
                    {availableFiles.map(file => (
                        <li key={file}>{file}</li>
                    ))}
                </ul>
              </>
            )}
          </div>
        );
    }

    const source = fs.readFileSync(filePath, "utf8");

    return (
      <article className="prose prose-neutral max-w-none">
        <MDXRemote source={source} components={mdxComponents} />
      </article>
    );

}


// Generate static params for all MDX files
export async function generateStaticParams() {
  function getFiles(dir, basePath = []) {
    const files = fs.readdirSync(dir);
    let paths = [];

    files.forEach(file => {
      const fullPath = path.join(dir, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // Recursively get files from subdirectories
        paths = paths.concat(getFiles(fullPath, [...basePath, file]));
      } else if (file.endsWith('.mdx')) {
        // Remove .mdx extension and create slog array
        const fileName = file.replace('.mdx', '');

        if (fileName === 'index') {
          if (basePath.length > 0) {
            paths.push({ slog: basePath });
          }
        } else {
          paths.push({ slog: [...basePath, fileName] });
        }

      }

    });

    return paths;
  }

  const params = getFiles(CONTENT_PATH);

  return params;
}

export async function generateMetadata(props) {
  const params = await props.params;
  const slogArray = params.slog || [];
  
  return {
    title: slogArray.length > 0 
      ? slogArray[slogArray.length - 1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
      : 'Documentation'
  };
}