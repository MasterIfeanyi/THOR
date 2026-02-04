import { Callout } from "./Callout";

export const mdxComponents = {
  h1: (props) => (
    <h1 className="mt-8 mb-4 text-4xl font-bold tracking-tight" {...props} />
  ),
  h2: (props) => (
    <h2 className="mt-10 mb-3 text-2xl font-semibold" {...props} />
  ),
  p: (props) => (
    <p className="mb-4 text-base leading-7 text-muted-foreground" {...props} />
  ),
  ul: (props) => <ul className="pl-6 mb-4 space-y-2 list-disc" {...props} />,
  code: (props) => (
    <code className="rounded bg-muted px-1.5 py-0.5 text-sm" {...props} />
  ),
  pre: (props) => (
    <pre
      className="overflow-x-auto p-4 mb-6 rounded-lg bg-zinc-900 text-zinc-100"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="pl-6 mt-6 italic border-l-2 text-muted-foreground"
      {...props}
    />
  ),
  Callout,
};
