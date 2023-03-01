---
"@pankod/refine-antd": major
---

## 🪄 Migrating your project automatically with refine-codemod ✨

[`@refinedev/codemod`](https://github.com/refinedev/refine/tree/master/packages/codemod) package handles the breaking changes for your project automatically, without any manual steps. It migrates your project from `3.x.x` to `4.x.x`.

Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

```sh
npx @refinedev/codemod refine3-to-refine4
```

And it's done. Now your project uses `refine@4.x.x`.

## 📝 Changelog

Deprecated `useMenu` removed from `@refinedev/antd` package. Use `useMenu` from `@refinedev/core` package instead.

```diff
- import { useMenu } from "@refinedev/antd";
+ import { useMenu } from "@refinedev/core";
```
