---
"@pankod/refine-react-hook-form": major
---

All `react-hook-form` imports re-exported from `@pankod/refine-react-hook-form` have been removed. You should import them from the `react-hook-form` package directly.

If the package is not installed, you can install it with your package manager:

```bash
npm install react-hook-form
# or
pnpm add react-hook-form
# or
yarn add react-hook-form
```

After that, you can import them from `react-hook-form` package directly.

```diff
- import { useForm, Controller } from "@pankod/refine-react-hook-form";

+ import { useForm } from "@refinedev/react-hook-form";
+ import { Controller } from "react-hook-form";
```
