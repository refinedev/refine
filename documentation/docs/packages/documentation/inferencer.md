---
id: inferencer
title: Inferencer
---

`@pankod/refine-inferencer` is a package that provides a way to automatically generate views for resources based on the data structure. The aim is to reduce the amount of time spent on creating views for resources by generating the code automatically that can be customized easily. 

The package exports components for **List**, **Show**, **Create** and **Edit** views inside UI package scopes. For example, `@pankod/refine-inferencer/antd` exports components for `@pankod/refine-antd` package.

## Installation

<Tabs
defaultValue="npm"
values={[
{label: 'use npm', value: 'npm'},
{label: 'use yarn', value: 'yarn'}
]}>
<TabItem value="npm">

```bash
npm i @pankod/refine-inferencer
```

  </TabItem>
    <TabItem value="yarn">

```bash
yarn add @pankod/refine-inferencer
```

  </TabItem>
</Tabs>

## Available UI Inferencers

- [Ant Design](/docs/api-reference/antd/components/inferencer)
- [Material UI](/docs/api-reference/mui/components/inferencer)
- [Mantine](/docs/api-reference/mantine/components/inferencer)
- [Chakra UI](/docs/api-reference/chakra-ui/components/inferencer)

:::info
`@pankod/refine-inferencer` is an experimental package and it is now in the early stages of development. We are working on improving the package and adding new features.

If you have any suggestions or feedback, please let us know in the [**GitHub Discussions**](https://github.com/refinedev/refine/discussions/3046)
:::

:::caution Warning
`@pankod/refine-inferencer` components are meant to be used in development environments. They are not meant to be used in production environments.
:::