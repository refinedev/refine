---
"@refinedev/mantine": minor
---

## 🪄 Migrating your project automatically with refine-codemod ✨

[`@refinedev/codemod`](https://github.com/refinedev/refine/tree/master/packages/codemod) package handles the breaking changes for your project automatically, without any manual steps. It migrates your project from `3.x.x` to `4.x.x`.

Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

```sh
npx @refinedev/codemod refine3-to-refine4
```

And it's done. Now your project uses `refine@4.x.x`.

## 📝 Changelog

All **Mantine** components re-exported from `@refinedev/mantine` have been removed. You should import them from Mantine packages directly.

If the packages are not installed, you can install them with your package manager:

> You don't have to install all of these packages below. Only install the packages you use.

```bash
npm install @mantine/core@5 @emotion/react @mantine/hooks@5 @mantine/notifications@5 @mantine/form@5
# or
pnpm add @mantine/core@5 @emotion/react @mantine/hooks@5 @mantine/notifications@5 @mantine/form@5
# or
yarn add @mantine/core@5 @emotion/react @mantine/hooks@5 @mantine/notifications@5 @mantine/form@5
```

After that, you can import them from related packages directly.

```diff
- import {
-    MantineProvider,
-    NotificationsProvider,
-    TextInput,
-    Select,
-    List,
-    useSelect,
- } from "@refinedev/mantine";

+ import { useSelect, List } from "@refinedev/mantine";
+ import { MantineProvider, TextInput, Select } from "@mantine/core";
+ import { NotificationsProvider } from "@mantine/notifications";
```
