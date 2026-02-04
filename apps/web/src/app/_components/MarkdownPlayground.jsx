"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import { darkMarkdownComponents } from "./MdxComponents";
import { FiCopy, FiCheck, FiRotateCcw, FiTrash2 } from "react-icons/fi";
import ProtectedRoute from "./ProtectedRoute";
import useLocalStorage from "@/hooks/useLocalStorage";

const defaultMarkdown = `# Welcome to the Markdown Playground! 🎨

## What is Markdown?
Markdown is a lightweight markup language that you can use to format text.

### Basic Syntax Examples

**Bold text** and *italic text*

- Bullet point 1
- Bullet point 2
  - Nested item

1. Numbered list
2. Second item

### Code Examples

Inline code: \`const greeting = "Hello World"\`

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Developer"));
\`\`\`

### Links and Images

[Visit GitHub](https://github.com)

### Blockquotes

> "The best way to predict the future is to invent it."
> - Alan Kay

### Tables

| Feature | Status |
|---------|--------|
| Headers | ✅ |
| Lists | ✅ |
| Code | ✅ |

---

**Try editing this text!** 👈`;

export default function MarkdownPlayground() {
  const [markdown, setMarkdown] = useLocalStorage(
    "markdown-playground",
    defaultMarkdown,
  );

  const [showPreview, setShowPreview] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setMarkdown(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("markdown-playground", value);
    }
  };

  const handleReset = () => {
    setMarkdown(defaultMarkdown);
    localStorage.setItem("markdown-playground", defaultMarkdown);
  };

  const handleClear = () => {
    setMarkdown("");
    localStorage.setItem("markdown-playground", "");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen text-gray-100">
        {/* Header */}
        <div className="border-b border-gray-800">
          <div className="px-4 py-4 mx-auto max-w-7xl">
            <div className="flex flex-col gap-4 justify-between items-start sm:flex-row sm:items-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  Markdown Playground
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Learn and practice markdown syntax in real-time
                </p>
              </div>
              <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                <Button
                  onClick={() => setShowPreview(!showPreview)}
                  className="flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer sm:flex-none"
                >
                  {showPreview ? "Hide Preview" : "Show Preview"}
                </Button>
                <Button
                  variant="secondary"
                  onClick={handleReset}
                  className="flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer sm:flex-none"
                >
                  <FiRotateCcw /> Reset
                </Button>
                <Button
                  variant="danger"
                  onClick={handleClear}
                  className="flex-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer sm:flex-none"
                >
                  <FiTrash2 /> Clear
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Editor and Preview */}
        <div className="p-4 mx-auto max-w-7xl">
          <div
            className={`grid gap-4 ${showPreview ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"}`}
          >
            <div className="flex flex-col gap-0">
              <div className="flex justify-between items-center px-4 py-2 bg-gray-800 rounded-t-lg border-b border-gray-700">
                <span className="text-sm font-medium text-gray-300">
                  Editor
                </span>
                <Button
                  onClick={handleCopy}
                  className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Copy markdown"
                >
                  {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <TextArea
                id="markdown-editor"
                name="markdown"
                value={markdown}
                onChange={handleChange}
                placeholder="Start typing markdown here..."
                rows={25}
                className="flex-1 p-4 font-mono text-sm text-white bg-gray-800 rounded-b-lg resize-none min-h-150 bg-gray-850 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Preview */}
            {showPreview && (
              <section className="flex flex-col h-[120vh]">
                <div className="px-4 py-2 bg-gray-800 rounded-t-lg border border-b border-gray-700">
                  <span className="text-sm font-medium text-gray-300">
                    Preview
                  </span>
                </div>
                <div className="overflow-auto flex-1 p-6 bg-gray-800 rounded-b-lg border border-t-0 border-gray-700">
                  <div className="max-w-none prose prose-invert prose-slate">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      components={darkMarkdownComponents}
                    >
                      {markdown}
                    </ReactMarkdown>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Cheat Sheet */}
        <div className="px-4 pb-8 mx-auto max-w-7xl">
          <details className="p-4 rounded-lg border border-gray-800 bg-gray-850">
            <summary className="mb-4 text-lg font-semibold text-gray-300 transition-colors cursor-pointer dark:text-white hover:text-primary">
              📚 Markdown Cheat Sheet
            </summary>
            <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-4">
              <div>
                <h4 className="mb-2 font-semibold text-gray-300 dark:text-white">
                  Headers
                </h4>
                <code className="block p-2 mb-2 bg-gray-900 rounded">
                  # H1
                  <br />
                  ## H2
                  <br />
                  ### H3
                </code>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-primary">Emphasis</h4>
                <code className="block p-2 mb-2 bg-gray-900 rounded">
                  *italic* or _italic_
                  <br />
                  **bold** or __bold__
                  <br />
                  ***bold italic***
                </code>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-primary">Lists</h4>
                <code className="block p-2 mb-2 bg-gray-900 rounded">
                  - Item 1<br />
                  - Item 2<br />
                  - Nested
                  <br />
                  <br />
                  1. First
                  <br />
                  2. Second
                </code>
              </div>
              <div>
                <h4 className="mb-2 font-semibold text-primary">
                  Links & Images
                </h4>
                <code className="block p-2 mb-2 bg-gray-900 rounded">
                  [text](url)
                  <br />
                  ![alt](image-url)
                </code>
              </div>
            </div>
          </details>
        </div>
      </div>
    </ProtectedRoute>
  );
}
