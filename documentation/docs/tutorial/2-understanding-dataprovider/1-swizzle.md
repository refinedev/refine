---
id: swizzle
title: 2. Swizzle
tutorial:
    prev: tutorial/understanding-dataprovider/index
    next: tutorial/understanding-dataprovider/create-dataprovider
---

## What is Swizzle?

The [`swizzle`](../../packages/documentation/cli.md#swizzle) that comes with [`refine-cli`](../../packages/documentation/cli.md) allows you to customize the supported components and use them as your own. For data providers, this is a very useful tool.

*TODO: This section should explain the What is swizzle, why we need it and why we are we using very clearly.*

## Using with DataProvider

In some cases, refine's built-in data providers are not fully complying with our API needs and you may want to edit the existing data provider logic.. The [`swizzle`](../../packages/documentation/cli.md#swizzle) command feature in [`refine-cli`](../../packages/documentation/cli.md) can be use for that. It can quickly eject and update all data provider files.

In this section, we'll take advantage of `swizzle` feature to inspect "refine's built-in rest data provider" files and how to customize..

Let's swizzle `dataProvider` as an example.

```bash
npm run refine swizzle
```
Select the data provider package from the list of packages that support `swizzle`.

```bash
? Which package do you want to swizzle?
  Data Provider
❯  @pankod/refine-simple-rest
  UI Framework
   @pankod/refine-antd
```

Then select `DataProvider`.

```bash
? Which component do you want to swizzle? (Use arrow keys)
❯  Data Provider
```

The necessary files for this package are being copied to the project by `swizzle`.

```bash
Successfully swizzled Data Provider
Files created:
 - src/rest-data-provider/index.ts
 - src/rest-data-provider/utils/axios.ts
 - src/rest-data-provider/utils/generateFilter.ts
 - src/rest-data-provider/utils/generateSort.ts
 - src/rest-data-provider/utils/mapOperator.ts
 - src/rest-data-provider/utils/index.ts

Warning:
You will also need to add axios to your project dependencies.

Usage

    ╭ App.tsx ─────────────────────────────────────────────────╮
    │                                                          │
    │   import { dataProvider } from "./rest-data-provider";   │
    │                                                          │
    │   const App = () => {                                    │
    │       return (                                           │
    │           <Refine                                        │
    │               dataProvider={dataProvider}                │
    │               /* ... */                                  │
    │           />                                             │
    │       );                                                 │
    │   }                                                      │
    │                                                          │
    ╰──────────────────────────────────────────────────────────╯
```

