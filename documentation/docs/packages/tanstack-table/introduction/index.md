---
title: Introduction
source: /packages/react-table/src/useTable
---

import BaseHeadlessTable from "../examples/headless";
import BaseMantineTable from "../examples/mantine";
import BaseChakraUiTable from "../examples/chakra-ui";

# TanStack Table <GuideBadge id="guides-concepts/tables" /> <RouterBadge id="guides-concepts/routing/#usetable" />

Refine provides an integration package for [TanStack Table][tanstack-table] library. This package enables you to manage your tables in a headless manner. This adapter supports all of the features of both [TanStack Table][tanstack-table] and [Refine's useTable][use-table-core] hook (sorting, filtering pagination etc). Simply, you can use any of the [TanStack Table][tanstack-table] examples as-is by copying and pasting them into your project.

## Installation

Install the [`@refinedev/react-table`][refine-react-table] library.

<InstallPackagesCommand args="@refinedev/react-table"/>

## Usage

Let's see how to display a table with [useTable][use-table-tanstack] hook.

We provide implementation examples for the Mantine and Chakra UI. If you using a different ui library, you can use the headless example as a starting point.

<Tabs wrapContent={false}>

<TabItem value="headless" label="Headless">

<BaseHeadlessTable />

</TabItem>

<TabItem value="mantine" label={(<span><span className="block">Mantine</span><small className="block">TanStack Table</small></span>)}>

<BaseMantineTable />

</TabItem>

<TabItem value="chakra-ui" label={(<span><span className="block">Chakra UI</span><small className="block">TanStack Table</small></span>)}>

<BaseChakraUiTable />

</TabItem>

</Tabs>

[tanstack-table]: https://tanstack.com/table/v8
[refine-react-table]: https://github.com/refinedev/refine/tree/main/packages/react-table
[use-table-core]: /docs/data/hooks/use-table
[use-table-tanstack]: /docs/packages/list-of-packages
[baserecord]: /docs/core/interface-references#baserecord
[httperror]: /docs/core/interface-references#httperror
[syncwithlocationparams]: /docs/core/interface-references#syncwithlocationparams
[notification-provider]: /docs/notification/notification-provider
[crudsorting]: /docs/core/interface-references#crudsorting
[crudfilters]: /docs/core/interface-references#crudfilters
[Refine swl]: /docs/core/refine-component#syncwithlocation
