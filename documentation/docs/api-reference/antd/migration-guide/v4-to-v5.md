---
id: v4-to-v5
title: Migration Guide V4 to V5
---

Antd Design removed `less` and adopt `CSS-in-JS`, for better support of dynamic themes. The bottom layer uses [`@ant-design/cssinjs`](https://github.com/ant-design/cssinjs) as a solution.
Some components are removed or renamed, and some APIs are changed.

Some of the changes are:

-   `<PageHeader>` component moved into `@ant-design/pro-components`.
-   `<Comment>` component moved into `@ant-design/compatible`.
-   `moment.js` is replaced with `day.js`.
-   `less` is removed from `antd` package.

> Please refer to [Ant Design Migration Guide](https://ant.design/docs/react/migration-v5) for detailed information.

This document will help you upgrade from antd 4.x version to antd 5.x version.

:::danger
Next.js 13 Not Supported
Currently `ant-design/pro-components` does not compatible with Next.js 13. **refine** is using `ant-design/pro-components` as a dependency for <PageHeader/> component.
More information: [issue](https://github.com/ant-design/pro-components/issues/6338)
:::

:::info
`antd@5.x.x` is equal to `@pankod/refine-antd@4.x.x`

`antd@4.x.x` is equal to `@pankod/refine-antd@3.x.x`
:::

## 🪄 Migrating your project automatically with refine-codemod ✨ (recommended)

@pankod/refine-codemod package handles the breaking changes for your project automatically, without any manual steps. It migrates your [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/next/packages/antd) version from 3.x.x to 4.x.x.

Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

```sh
npx @pankod/refine-codemod antd4-to-antd5
```

And it's done. Now your project uses `@pankod/refine-antd@4.x.x`.

## Migrating your project manually

### Updating the packages

[`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/next/packages/antd) must be updated to `4.x.x`

<Tabs
defaultValue="refine-cli"
values={[
{label: 'refine CLI', value: 'refine-cli'},
{label: 'Manuel', value: 'manuel'},
]}>

<TabItem value="refine-cli">

```bash
npm run refine update --all --tag latest
```

</TabItem>

<TabItem value="manuel">

```bash
npm i @pankod/refine-antd@latest
```

</TabItem>

</Tabs>

### Remove Craco

Ant Design removed `less` support from `antd` package. So we don't need `craco` anymore.

```bash
npm uninstall craco-less @craco/craco
```

> Remove `craco.config.js` file in the root folder of your project.

```diff title="package.json"
    "scripts": {
-        "start": "craco start",
-        "build": "craco build",
-        "test": "craco test",
-        "eject": "craco eject"
+        "start": "react-scripts start",
+        "build": "react-scripts build",
+        "test": "react-scripts test",
+        "eject": "react-scripts eject"
    },
```

### Updating Imports

-   Css files are no longer included in package. Since CSS-in-JS supports importing on demand, the original `styles/antd.less` has also been abandoned. If you need to reset some basic styles, please import `@pankod/refine-antd/dist/reset.css`

```diff title="App.tsx"
- import "@pankod/refine-antd/dist/styles.min.css";
+ import "@pankod/refine-antd/dist/reset.css";
```

### Updating Props

`actionButtons` and `pageHeaderProps` props are removed from `<List>`, `<Create>`, `<Edit>`, `<Show>` component due to incosistency with all UI packages. Use `headerButtons` and `headerProps` props instead.

```diff title="List.tsx"
- <List actionButtons={actionButtons} pageHeaderProps={pageHeaderProps}>
+ <List headerButtons={actionButtons} headerProps={pageHeaderProps}>
```
