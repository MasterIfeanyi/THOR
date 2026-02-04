import { Callout } from "./Callout";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const mdxComponents = {
  h1: (props) => (
    <h1 className="text-4xl font-bold tracking-tight mt-8 mb-4" {...props} />
  ),
  h2: (props) => (
    <h2 className="text-2xl font-semibold mt-10 mb-3" {...props} />
  ),
  p: (props) => (
    <p className="text-base leading-7 text-muted-foreground mb-4" {...props} />
  ),
  ul: (props) => (
    <ul className="list-disc pl-6 space-y-2 mb-4" {...props} />
  ),
  code: (props) => (
    <code className="rounded bg-muted px-1.5 py-0.5 text-sm" {...props} />
  ),
  pre: (props) => (
    <pre className="rounded-lg bg-zinc-900 text-zinc-100 p-4 overflow-x-auto mb-6" {...props} />
  ),
   blockquote: (props) => (
    <blockquote
      className="mt-6 border-l-2 pl-6 italic text-muted-foreground"
      {...props}
    />
  ),
  Callout,
};


export const darkMarkdownComponents = {
  code({ node, inline, className, children, ...props }) {
    const match = /language-(\w+)/.exec(className || '');
    return !inline && match ? (
      <SyntaxHighlighter
        style={vscDarkPlus}
        language={match[1]}
        PreTag="div"
        {...props}
      >
        {String(children).replace(/\n$/, '')}
      </SyntaxHighlighter>
    ) : (
      <code className="bg-gray-700 px-1.5 py-0.5 rounded text-sm" {...props}>
        {children}
      </code>
    );
  },
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-100">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-100">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-xl font-bold mt-4 mb-2 text-gray-100">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-gray-300 leading-relaxed">{children}</p>
  ),
  a: ({ children, href }) => (
    <a href={href} className="text-blue-400 hover:text-blue-300 underline" target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside mb-4 space-y-2 text-gray-300">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside mb-4 space-y-2 text-gray-300">{children}</ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 my-4 italic text-gray-400 bg-gray-800 rounded">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="overflow-x-auto my-4">
      <table className="min-w-full border border-gray-700">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border border-gray-700 px-4 py-2 bg-gray-800 font-semibold text-left">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border border-gray-700 px-4 py-2">{children}</td>
  ),
  hr: () => <hr className="my-8 border-gray-700" />,
}