---
"@pankod/refine-antd": minor
---

We've released Ant Design v5 support :tada:

## Upgrade

⚡️ You can easily update **refine** packages with **refine** CLI [`update`](https://refine.dev/docs/packages/documentation/cli/#update) command.

```bash
npm run refine update
```
> [How to add refine CLI to an existing project?](https://refine.dev/docs/packages/documentation/cli/#how-to-add-to-an-existing-project)


### 🪄 Migrating your project automatically with Codemod ✨

`@pankod/refine-codemod` package handles the breaking changes for your project automatically, without any manual steps. It migrates your [`@pankod/refine-antd`](https://github.com/refinedev/refine/tree/next/packages/antd) version from 3.x.x to 4.x.x.

Just `cd` into root folder of your project (where `package.json` is contained) and run this command:

```sh
npx @pankod/refine-codemod antd4-to-antd5
```

And it's done. Now your project uses `@pankod/refine-antd@4.x.x`.

## Changes
-   `<PageHeader>` component moved into `@ant-design/pro-components`. **refine** is using `<PageHeader>` in `<List>`, `<Create>`, `<Edit>`, `<Show>` components and added as a dependency. You don't need to install `@ant-design/pro-components` package manually.
-   `<Comment>` component moved into `@ant-design/compatible`.
-   `moment.js` is replaced with `day.js`.
-   `less` is removed from `antd` package.

> Please refer to [Ant Design Migration Guide](https://ant.design/docs/react/migration-v5) for detailed information.

🚨 Next.js 13 Not Supported Now

Currently `ant-design/pro-components` does not compatible with Next.js 13.
**refine** is using `ant-design/pro-components` as a dependency for `<PageHeader/>` component.

> [Refer to a related issue on ant-design/pro-components repository](https://github.com/ant-design/pro-components/issues/6338)