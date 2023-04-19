---
id: swizzle
tutorial:
    prev: tutorial/understanding-dataprovider/index
    next: tutorial/understanding-dataprovider/create-dataprovider
---

# 2. Create a data provider with `swizzle`

## What is `swizzle`?

In some cases, **refine's** built-in data providers may not fully meet your API needs, and you may want to edit the existing data provider logic. If that is the case, you should use `swizzle`.

The [`swizzle`](../../packages/documentation/cli.md#swizzle) is a command in [`refine-cli`](../../packages/documentation/cli.md) that allows you to customize **refine’s** supported components and data providers by letting you eject selected files from the **refine** packages and modify them depending on your needs.

This also allows you to use the ejected file code logic as a starting point for your modifications instead of starting from scratch.

## How do you use `swizzle` to create an data provider?

1. Run the `swizzle` command in the project directory:

    ```bash
    npm run refine swizzle
    ```

2. Select the data provider package of your choice from the list. We are using `@refinedev/simple-rest` in this tutorial so we will choose that.

    ```bash
    ? Which package do you want to swizzle?
      Data Provider
    ❯  @refinedev/simple-rest
      UI Framework
      @refinedev/antd
    ```

    `swizzle` will copy the necessary files for this package to the `src/rest-data-provider` folder

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

3. To use the generated data provider, we need to import it in the `App.tsx` file and give it as a `dataProvider` prop to the `Refine` component.

And with that, you are now able to modify and use the ejected data provider however you want. Amount of time saved using `swizzle` instead of creating a data provider from scratch is quite substantial.

<Checklist>

<ChecklistItem id="data-provider-swizzle">
I have learned what `swizzle` is and how to use it.
</ChecklistItem>

</Checklist>
