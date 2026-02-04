# Engineering Decisions

## Tooling decision: Tailwind CSS v4 installation

**Context**

TanStack Start and `Vite` v7 currently present peer dependency conflicts with Tailwind CSS v4 during installation.

**Decision**

Tailwind CSS v4 was installed using the `--legacy-peer-deps` flag.

**Rationale**

- The project requires Tailwind v4 features
- The conflict is limited to peer dependency resolution, not runtime behavior
- This allows progress without blocking initial development

**Tradeoffs**

- Potential for future breaking changes
- Requires closer monitoring of dependency updates

**Mitigation**

- Versions are locked in `package.json`
- The decision is documented for contributors
- Planned reevaluation once official compatibility is available


>Each app manages its own environment variables. Shared infrastructure variables live at the repository root.


## Code decision: React Rendering issue

**Context**

React rendering issues were observed in the `Playground` app, where localStorage was not updating the UI as expected.

**Error message**

```javascript

Error: Calling setState synchronously within an effect can trigger cascading renders
Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.
Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended. 

```

**Causation**

```javascript
    useEffect(() => {
        setMounted(true)
    }, [])
  if (!mounted) return null
```

**Decision**

The issue was resolved by creating the `useLocalStorage` hook.

**Rationale**

- The `localStorage` object is a global object and should be accessible within the hook
- Adding a dependency ensures that the hook is re-run whenever the `localStorage` object changes


## Code decision: GitHub authentication in playground

**Context**
The Playground app requires authentication to access certain features.

**Issue**
Whenever someone sign in with GitHub they get redirected to "sign in", when they should stay in "playground" after sign in.

**Causation**

```javascript

const handler = NextAuth({

    callbacks: {

        async redirect({url, baseUrl}) {
            // If the url is from the same origin, use it
            if (url.startsWith("/")) {
                return url
            } else {
                return `${baseUrl}/getting-started`
            }
        },

    }
})

export { handler as GET, handler as POST }

```

**Rationale** If the `url` is from the same origin, use it


## Build decision: Netlify deployment failure due to Prisma client initialization error

**Context**
The Netlify deployment failed due to an absence of Prisma Generation script.

The `monorepo` is structured using `npm` workspaces with the following layout:

```bash
root/
├── package.json          ← workspace root (prisma ^5.22.0)
├── apps/
│   └── web/
│       └── package.json  ← @repo/web
└── prisma/
        └── schema.prisma  ← (prisma generation source)
```

**Error message**

```javascript

Error: Prisma Client is not installed. Please run `npx prisma init` to set up Prisma Client.

Error type: PrismaClientInitializationError (Prisma client initialization failed)
```

**Causation**

The `prisma` package was not installed in the workspace during Netlify build.

**Solution**


Ensure Prisma client is generated during the build (so Netlify never uses a stale cached client)

```javascript
// root package.json (or apps/web/package.json if you prefer)
{
  "scripts": {
    "postinstall": "prisma generate"
  }
}
```

This ensures that when Netlify runs `npm install`, `prisma generate` runs and produces a fresh client.

**Trade-Offs**

The root `postinstall` hook runs generation for all workspaces on every `npm install`, even if only one workspace's dependencies changed. This is a minor CI-time cost and is acceptable given the scale of the current `monorepo`.

**Mitigation**

- This decision is documented here. Any contributor adding a new workspace that requires Prisma must reference this entry before declaring the dependency. 
- The unified Prisma version is pinned explicitly (not via a caret range) in the root `package.json` to prevent silent major-version drift during dependency updates. 
- The duplicate setup script was removed. Before, both the root and the web app had their own `postinstall` that tried to run `prisma generate`. Now only the root does it, and it handles generation for all workspaces in one clean pass. One script, one version, one source of truth.