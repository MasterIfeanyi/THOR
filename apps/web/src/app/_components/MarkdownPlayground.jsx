"use client"

import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Button from '@/components/Button';
import TextArea from '@/components/TextArea';
import { darkMarkdownComponents } from './mdx-components';
import { FiCopy, FiCheck } from 'react-icons/fi';

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

    const [markdown, setMarkdown] = useState(() => {
        const saved = localStorage.getItem('markdown-playground');
        saved ? saved : defaultMarkdown;
    });

    const [showPreview, setShowPreview] = useState(true);
    const [copied, setCopied] = useState(false);


    const handleChange = (e) => {
        const value = e.target.value;
        setMarkdown(value);
        localStorage.setItem('markdown-playground', value);
    };


    const handleReset = () => {
        setMarkdown(defaultMarkdown);
        localStorage.setItem('markdown-playground', defaultMarkdown);
    };

    const handleClear = () => {
        setMarkdown('');
        localStorage.setItem('markdown-playground', '');
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            {/* Header */}
            <div className="border-b border-gray-800 bg-gray-950">
                <div className="max-w-7xl mx-auto px-4 py-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold">Markdown Playground</h1>
                            <p className="text-sm text-gray-400 mt-1">
                                Learn and practice markdown syntax in real-time
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                            <Button
                                onClick={() => setShowPreview(!showPreview)}
                                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-none"
                            >
                                {showPreview ? 'Hide Preview' : 'Show Preview'}
                            </Button>
                            <Button
                                variant='secondary'
                                onClick={handleReset}
                                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-none"
                            >
                                Reset
                            </Button>
                            <Button
                                variant="danger"
                                onClick={handleClear}
                                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 sm:flex-none"
                            >
                                Clear
                            </Button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Editor and Preview */}
            <div className="max-w-7xl mx-auto p-4">
                <div className={`grid gap-4 ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                    <div className="flex flex-col">
                        <div className="bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-700 flex justify-between items-center">
                            <span className="text-sm font-medium text-gray-300">
                                Editor
                            </span>
                            <Button
                                onClick={handleCopy}
                                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded text-xs font-medium transition-colors flex items-center gap-1.5"
                                title="Copy markdown"
                            >
                                {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                                {copied ? 'Copied!' : 'Copy'}
                            </Button>
                        </div>
                        <TextArea
                            id="markdown-editor"
                            name="markdown"
                            value={markdown}
                            onChange={handleChange}
                            placeholder="Start typing markdown here..."
                            rows={25}
                            className="flex-1 min-h-150 bg-gray-850 text-foreground p-4 font-mono text-sm rounded-b-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        />
                    </div>



                    {/* Preview */}
                    {showPreview && (
                        <div className="flex flex-col">
                            <div className="bg-gray-800 px-4 py-2 rounded-t-lg border-b border-gray-700 border">
                                <span className="text-sm font-medium text-gray-300">
                                    Preview
                                </span>
                            </div>
                            <div className="flex-1 bg-gray-800 p-6 rounded-b-lg overflow-auto border border-t-0 border-gray-700">
                                <div className="prose prose-invert prose-slate max-w-none">
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        components={darkMarkdownComponents}
                                    >
                                        {markdown}
                                    </ReactMarkdown>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>


            {/* Cheat Sheet */}
            <div className="max-w-7xl mx-auto px-4 pb-8">
                <details className="bg-gray-850 rounded-lg p-4 border border-gray-800">
                    <summary className="cursor-pointer font-semibold text-lg mb-4 hover:text-blue-400 transition-colors">
                        📚 Markdown Cheat Sheet
                    </summary>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-400">Headers</h4>
                            <code className="block bg-gray-900 p-2 rounded mb-2">
                                # H1<br />
                                ## H2<br />
                                ### H3
                            </code>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-400">Emphasis</h4>
                            <code className="block bg-gray-900 p-2 rounded mb-2">
                                *italic* or _italic_<br />
                                **bold** or __bold__<br />
                                ***bold italic***
                            </code>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-400">Lists</h4>
                            <code className="block bg-gray-900 p-2 rounded mb-2">
                                - Item 1<br />
                                - Item 2<br />
                                - Nested<br />
                                <br />
                                1. First<br />
                                2. Second
                            </code>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-2 text-blue-400">Links & Images</h4>
                            <code className="block bg-gray-900 p-2 rounded mb-2">
                                [text](url)<br />
                                ![alt](image-url)
                            </code>
                        </div>
                    </div>
                </details>
            </div>
        </div>
    )
}