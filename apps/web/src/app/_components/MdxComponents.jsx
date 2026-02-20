import { Callout } from "./Callout";

export const mdxComponents = {
  // Headings – using CSS variables (text-foreground) so they adapt automatically
  h1: (props) => (
    <h1
      className="mt-8 mb-4 text-4xl font-bold tracking-tight text-foreground"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-10 mb-3 text-2xl font-semibold text-foreground"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 mb-3 text-xl font-semibold text-foreground"
      {...props}
    />
  ),

  // Paragraphs – using muted foreground for a softer contrast (adjust as needed)
  p: (props) => (
    <p
      className="mb-4 text-base leading-7 text-muted-foreground"
      {...props}
    />
  ),

  // Lists – using foreground for list markers, no extra dark classes needed
  ul: (props) => (
    <ul
      className="pl-6 mb-4 space-y-2 list-disc text-foreground"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="pl-6 mb-4 space-y-2 list-decimal text-foreground"
      {...props}
    />
  ),

  // Inline code – uses the muted background and foreground variables
  code: (props) => (
    <code
      className="rounded bg-muted px-1.5 py-0.5 text-sm text-foreground"
      {...props}
    />
  ),

  // Code blocks – keep a distinctive look but switch to a slightly lighter dark background
  pre: (props) => (
    <pre
      className="p-4 mb-6 overflow-x-auto rounded-lg bg-zinc-900 text-zinc-100 dark:bg-gray-800 dark:text-gray-200"
      {...props}
    />
  ),

  // Blockquotes – use muted background and border, with muted foreground
  blockquote: (props) => (
    <blockquote
      className="pl-6 mt-6 italic bg-muted border-l-2 border-border text-muted-foreground"
      {...props}
    />
  ),

  // Links – include target blank and hover effects, using primary color
  a: (props) => (
    <a
      href={props.href}
      className="text-primary underline hover:text-primary/80 dark:text-primary/90 dark:hover:text-primary"
      target="_blank"
      rel="noopener noreferrer"
    >
      {props.children}
    </a>
  ),

  // Italic – using foreground, bold weight to stand out
  i: ({ children }) => (
    <i className="italic font-bold text-foreground">{children}</i>
  ),

  // Tables – wrapped in scroll container, with borders based on --border
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table className="min-w-full border border-border text-foreground">
        {children}
      </table>
    </div>
  ),
  th: ({ children }) => (
    <th className="px-4 py-2 font-semibold text-left bg-muted border border-border">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-2 border border-border">{children}</td>
  ),

  // Horizontal rule
  hr: () => <hr className="my-8 border-border" />,

  // Callout component – already uses dark: variants internally
  Callout,
};