---
id: swizzle
title: 2. Swizzle
tutorial:
    prev: tutorial/understanding-dataprovider/index
    next: tutorial/understanding-dataprovider/create-dataprovider
---

## Understanding the Swizzle

Sometimes you may want to regulate data providers. You can copy and edit these files in your project using `swizzle` from `refine-cli`.

Let's swizzle `dataProvider` as an example.

```bash
npm run refine swizzle
```
Select the `dataProvider` package from the list of packages that support `swizzle`.

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

