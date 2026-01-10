import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import { redirect } from 'next/navigation';


const CONTENT_PATH = path.join(
  process.cwd(),
  "src",
  "app",
  "(docs)",
  "content"
);

export default async function DocPage(props) {

    const params = await props.params;
    // Handle when params.slug is undefined (root route)
    const slugArray = params.slug || [];

    if (slugArray.length === 0) {
        redirect('/getting-started/introduction');
    }


    // Build the file path from the slug array
    let filePath;

    if (slugArray.length === 0) {
        // If at root, show index.mdx or default content
        filePath = path.join(CONTENT_PATH, "index.mdx");
    } else {
        // Join slug parts to create path
        filePath = path.join(CONTENT_PATH, ...slugArray) + ".mdx";
    }


    if (!fs.existsSync(filePath)) {
        
        const dir = path.dirname(filePath);
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

    return <MDXRemote source={source} />;
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
        // Remove .mdx extension and create slug array
        const fileName = file.replace('.mdx', '');
        paths.push({
          slug: [...basePath, fileName]
        });
      }
    });

    return paths;
  }

  const params = getFiles(CONTENT_PATH);

  return params;
}

export async function generateMetadata(props) {
  const params = await props.params;
  const slugArray = params.slug || [];
  
  return {
    title: slugArray.length > 0 
      ? slugArray[slugArray.length - 1].replace(/-/g, ' ')
      : 'Documentation'
  };
}