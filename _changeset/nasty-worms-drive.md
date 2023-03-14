---
"@refinedev/chakra-ui": major
---

## 🪄 Migrating your project automatically with refine-codemod ✨

[`@refinedev/codemod`](https://github.com/refinedev/refine/tree/master/packages/codemod) package handles the breaking changes for your project automatically, without any manual steps. It migrates your project from `3.x.x` to `4.x.x`.

Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

```sh
npx @refinedev/codemod refine3-to-refine4
```

And it's done. Now your project uses `refine@4.x.x`.

## 📝 Changelog

All **Chakra UI** components re-exported from `@refinedev/chakra-ui` have been removed. You should import them from `@chakra-ui/react` package directly.

If the packages are not installed, you can install them with your package manager:

> You don't have to install all of these packages below. Only install the packages you use.

```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
# or
pnpm add @chakra-ui/react @emotion/react @emotion/styled framer-motion
# or
yarn add @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

After that, you can import them from related packages directly.

```diff
- import {
-    ChakraProvider,
-    Input,
-    Select,
-    ShowButton,
-    usePagination,
- } from "@refinedev/chakra-ui";

+ import { usePagination, ShowButton } from "@refinedev/chakra-ui";
+ import { ChakraProvider, Input, Select } from "@chakra-ui/react";
```
