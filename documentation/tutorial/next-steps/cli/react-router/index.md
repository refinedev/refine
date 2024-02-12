---
title: Using CLI
---

import { Sandpack } from "./sandpack.tsx";

<Sandpack>

In the previous step, we've learned about the Inferencer package and how to use it to generate views for resources. In this step, we'll be learning about the Refine's CLI and its features.

Refine offers a `@refinedev/cli` package that provides a set of commands and built-in utilities to help you build and manage your Refine applications. In the tutorial we'll cover the following commands:

- Runners, which are used to start the development server, build the application for production and run the preview server,
- `add` command to create new resources and providers,
- `update` command to check and update versions of the Refine packages,
- `swizzle` command to export Refine components and providers on your project to customize them.

## Installation

At the beginning of the tutorial, we've already installed the `@refinedev/cli` but if you've missed this step, you can use the below command to install it easily:

<InstallPackagesCommand args="@refinedev/cli" />

## Using Runners

We've already handed over our runners to the CLI's runners, our `package.json` file's scripts should look like the below:

```json title="package.json"
{
  "scripts": {
    "dev": "refine dev",
    "build": "refine build",
    "start": "refine start",
    "refine": "refine"
  }
}
```

These commands will use the same runners as your bundler under the hood and using the CLI runners is optional. It's recommended to do so because it will keep you updated with the updates from the Refine team and will notify you when there's a new version of a Refine package.

:::note

Notice that we have the `refine` command defined in `"scripts"`. This command is used to run the CLI commands. You can use the `refine` command to run the CLI commands with the `npx` command as well.

:::

## Using the `add` Command

The `add` command can be used to create new resources and providers. It's a powerful command that can create a new resource or a provider with a single command.

Try to run the following command to create a new resource called `categories`:

```sh
npm run refine add resource categories
```

By running this command you'll be prompted to select the actions you want to create for the `categories` resource. After you've selected the actions, the CLI will create the necessary files for the resource, populate the files with Inferencer components and add the resource definition to your `<Refine />` component.

We can also use the `add` command to create a new provider. The list of available providers that can be created with the `add` command is:

- Auth Provider to handle authentication,
- Data Provider to handle data fetching and mutations,
- Live Provider to handle real-time updates,
- Access Control Provider to handle access control and permissions.
- Audit Log Provider to submit/list audit logs.
- i18n Provider to handle internationalization and localization.
- Notification Provider to handle notifications.

Try to run the following command to create a new i18n Provider:

```sh
npm run refine add i18n
```

By running this command, you'll be provided with the necessary files for the i18n provider and the provider definition will be added to your `<Refine />` component.

## Using the `update` Command

The `update` command can be used to check and update versions of the Refine packages. As it's mentioned in the [Using Runners](#using-runners) section, if you use the runner commands, you'll be notified when there's a new version of a Refine package. When notified, you can run the `update` command to update the versions of the Refine packages.

Try to run the following command to check and update the versions of the Refine packages:

```sh
npm run refine update
```

## Using the `swizzle` Command

The `swizzle` command can be used to export Refine components and providers on your project to customize them. It's a powerful command that can export a Refine component or a provider with a single command. By running the `swizzle` command, you will have the ability to customize the exported component or provider. You can also use the exported elements as a starting point to create your own components and providers.

:::note

Please note that the `swizzle` command is a one-time operation and exporting the elements will detach them from the Refine's updates and you will be responsible for updating the exported elements if there are any breaking changes in the future. Refine won't be using the exported elements in the application automatically, you will need to import and use them manually.

:::

Try to run the following command to see swizzle in action:

```sh
npm run refine swizzle
```

By running this command, you'll be prompted to pick the package you want to export the elements from. After you've selected the package, you'll be prompted to select the elements you want to export. The CLI will export the selected elements to the appropriate directory depending on your application's setup.

In this unit, we've briefly covered the Refine's CLI and its features. In the next unit, we'll be learning about the Refine's Devtools.

</Sandpack>
