---
"@refinedev/core": minor
---

All `@tanstack/react-query` imports re-exported from `@refinedev/core` have been removed. You should import them from `@tanstack/react-query` package directly.

If the package is not installed, you can install it with your package manager:

```bash
npm install @tanstack/react-query
# or
pnpm add @tanstack/react-query
# or
yarn add @tanstack/react-query
```
After that, you can import them from `@tanstack/react-query` package directly instead of `@refinedev/core` package.

```diff
- import { QueryClient } from "@refinedev/core";

+ import { QueryClient } from "@tanstack/react-query";
```
