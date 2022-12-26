---
id: swizzle
title: 2. Swizzle
tutorial:
    prev: tutorial/understanding-dataprovider/index
    next: tutorial/understanding-dataprovider/create-dataprovider
---

## What is Swizzle?

The [`swizzle`](../../packages/documentation/cli.md#swizzle) that comes with [`refine-cli`](../../packages/documentation/cli.md) allows you to customize the supported components and use them as your own. For data providers, this is a very useful tool.

## Using with DataProvider

In some cases, data providers do not fully comply with our API and it is necessary to change it. The [`swizzle`](../../packages/documentation/cli.md#swizzle) in [`refine-cli`](../../packages/documentation/cli.md) is a tool made for this. It can quickly eject and update all data provider files.

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

