"use client"

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

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

}