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
};
