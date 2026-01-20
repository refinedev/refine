---
"@refinedev/cli": patch
---

fix(cli): pass through flags to underlying build tools

Fixed an issue where command-line flags were not being passed through to the underlying build tools (Vite, Next.js, Remix, etc.) when using `refine dev`, `refine start`, or `refine build` commands.

**What changed:**

- Added `.passThroughOptions()` to dev, start, and build commands
- Added `.enablePositionalOptions()` to parent command in CLI

**Usage:**
Users can now pass flags directly to the underlying tools without worrying about the double-dash separator:

```bash
# Pass flags to Vite
npm run dev -- --host
npm run dev -- --port 3001 --open

# Pass flags to Next.js
npm run dev -- --turbo --port 3001

# Pass flags to build commands
npm run build -- --sourcemap
```

**Note:** For the best user experience, we've also updated all example `package.json` files to include `--` at the end of refine commands (e.g., `"dev": "refine dev --"`), allowing users to omit the double-dash separator when using npm scripts.
