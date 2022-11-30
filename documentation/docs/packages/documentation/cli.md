---
id: cli
title: CLI
---

refine CLI is a command line application that allows you to interact with your **refine** project and perform some tasks. This includes adding a new resource, running runners (build, start, dev), managing updates and swizzle components.

## Installation

Install the [@pankod/refine-cli](https://github.com/refinedev/refine/tree/master/packages/cli) library.
It is available by default if you create a project with `npm create refine-app`.
We also recommend adding it as a dependency.

**How to add for existing project?**

<Tabs
    defaultValue="npm"
    values={[
        {label: 'use npm', value: 'npm'},
        {label: 'use yarn', value: 'yarn'},
    ]}
>
<TabItem value="npm">

```bash
npm i @pankod/refine-cli
```
</TabItem>
<TabItem value="yarn">

```bash
yarn add @pankod/refine-cli
```
</TabItem>
</Tabs>


<Tabs
    defaultValue="react"
    values={[
        {label: 'React', value: 'react'},
        {label: 'Next.js', value: 'nextjs'},
        {label: 'Remix', value: 'remix'}
    ]}
>
<TabItem value="react">

```diff title="package.json"
{
    "scripts": {
-        "dev": "react-scripts start",
-        "build": "react-scripts build",
+        "dev": "refine start",
+        "build": "refine build",
+        "refine": "refine"
    }
}    
```
</TabItem>
<TabItem value="nextjs">

```diff title="package.json"
{
    "scripts": {
-        "dev": "next dev",
-        "build": "next build",
-        "start": "next start",
+        "dev": "refine dev",
+        "build": "refine build",
+        "start": "refine start",
+        "refine": "refine"
    }
}    
```
</TabItem>
<TabItem value="remix">

```diff title="package.json"
{
    "scripts": {
-       "dev": "remix dev",
-       "build": "remix build",
-       "start": "remix-serve build"
+       "dev": "refine dev",
+       "build": "refine build",
+       "start": "refine start",
+       "refine": "refine"
    }
}    
```
</TabItem>
</Tabs>

## Commands
### swizzle
### create-resource

Use this command to add a new resource to your project. CRUD components are created for the selected actions. These components are put on the specified path. The folder name here becomes plural.

```bash
> npm run refine create-resource
```

| Argument               | Description                               |
| ---------------------- | ----------------------------------------- |
| resourceName (optinal) | The name of the resource you want to add. |

#### Options

| Alias | Option    | Default                                                              | Description                                                                                |
| ----- | --------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| -a    | --actions | `list`,`create`,`edit`,`show`                                        | Only generate the specified actions.                                                       |
| -p    | --path    | react: `src/pages` next.js: `src/components` remix: `app/components` | The path to create source files. (It is created automatically according to the framework.) |
| -h    | --help    |                                                                      | Output usage information                                                                   |
 
#### Usage **Examples**

Let's create a `Category` resource with all the actions.

```bash
> npm run refine create-resource category

src/pages/
└── categories
    ├── create.tsx
    ├── edit.tsx
    ├── index.ts
    ├── list.tsx
    └── show.tsx
```

If we only want to use list and create actions, it should be like this.

```bash
> npm run refine create-resource category -- --actions list,create

src/pages/
└── categories
    ├── create.tsx
    ├── index.ts
    └── list.tsx
```

If we want to create these files in another path, use the `--path` option.

```bash
> npm run refine create-resource category -- --path src/resources --actions list,create

src/resources/
└── categories
    ├── create.tsx
    ├── index.ts
    └── list.tsx
```

You can also create multiple resources at the same time. For this, you can write the sources by separating them with a space.

```bash
> npm run refine create-resource category user -- --actions list,create

src/pages/
├── categories
│   ├── create.tsx
│   ├── index.ts
│   └── list.tsx
└── users
    ├── create.tsx
    ├── index.ts
    └── list.tsx
```

### update
Interactively update your outdated **refine** packages. To skip interactive mode, use the `--all` flag to update all outdated **refine** packages to selected tag.

```bash
> npm run refine update

? Choose packages to update (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)

   Package                          From      To

Patch Updates
 ◯ @pankod/refine-cli                1.5.1 -> 1.5.3

Minor Updates
 ◯ @pankod/refine-airtable           2.1.1 -> 2.7.8
 ◉ @pankod/refine-core              3.88.1 -> 3.90.4
 ◯ @pankod/refine-react-hook-form   3.31.0 -> 3.33.2
 ◯ @pankod/refine-simple-rest        2.6.0 -> 2.7.8
❯◉ @pankod/refine-strapi            3.18.0 -> 3.37.0

Major Updates
 ◯ @pankod/refine-airtable           2.1.1 -> 3.33.0
 ◯ @pankod/refine-simple-rest        2.6.0 -> 3.35.2
 ```

#### Options
| Option    | Alias | Description                                                                                 | Values           | Default                                                    |
| --------- | ----- | ------------------------------------------------------------------------------------------- | ---------------- | ---------------------------------------------------------- |
| --tag     | -t    | Select version to update to.                                                                | `latest`, `next` | Version ranges in the `package.json` will be installed.    |
| --all     | -a    | Use to skip interactive mode update and update all `refine` packages to the selected `tag`. |                  | `false` Interactive mode will be open.                     |
| --dry-run | -d    | Use to skip automatic installation. Prints the update command of the packages.              |                  | `false` Selected packages will be installed automatically. |

### check-updates
Show the running versions of the installed **refine** packages.

```bash
> npm run refine check-updates
                                    Update Available
                ┌────────────────────────────────┬─────────┬────────┬────────┐
                │ name                           │ current │ wanted │ latest │
                ├────────────────────────────────┼─────────┼────────┼────────┤
                │ @pankod/refine-airtable        │ 2.1.1   │ 2.7.8  │ 3.33.0 │
                ├────────────────────────────────┼─────────┼────────┼────────┤
                │ @pankod/refine-cli             │ 1.5.1   │ 1.5.3  │ 1.5.3  │
                ├────────────────────────────────┼─────────┼────────┼────────┤
                │ @pankod/refine-core            │ 3.88.1  │ 3.90.4 │ 3.90.4 │
                ├────────────────────────────────┼─────────┼────────┼────────┤
                │ @pankod/refine-react-hook-form │ 3.31.0  │ 3.33.2 │ 3.33.2 │
                ├────────────────────────────────┼─────────┼────────┼────────┤
                │ @pankod/refine-simple-rest     │ 2.6.0   │ 2.7.8  │ 3.35.2 │
                ├────────────────────────────────┼─────────┼────────┼────────┤
                │ @pankod/refine-strapi          │ 3.18.0  │ 3.37.0 │ 3.37.0 │
                └────────────────────────────────┴─────────┴────────┴────────┘
                    To update `refine` packages with the wanted version
                        Run the following command npx refine update
```

### dev,  start,  build
When you run `npm run refine [dev | start | build]` It will detect the framework you are using and run the commands accordingly.

Also you can pass environment variables, and all the options that are available in the framework. For example, you can run `NODE_ENV=production npm run refine dev --port 3001` to run the app on port 3001.

<Tabs
    defaultValue="cra"
    values={[
        {label: 'React', value: 'cra'},
        {label: 'Next.js', value: 'nextjs'},
        {label: 'Remix', value: 'remix'}
    ]}
>
<TabItem value="cra"> 

[Refer to the Create React App documentation for detailed usage. &#8594](https://create-react-app.dev/docs/available-scripts)


```bash
 # Starts application in development mode. Equivalent to `react-scripts start`.
npm run refine dev
```

```bash
# Creates a production build of your app. Equivalent to `react-scripts build`.
npm run refine build
```
</TabItem>

<TabItem value="nextjs">

[Refer to the Next.js documentation for detailed usage. &#8594](https://nextjs.org/docs/api-reference/cli)

```bash
# Starts application in development mode. Equivalent to `next dev`.
npm run refine dev
```

```bash
# Starts application in production mode. Equivalent to `next start`.
npm run refine start
```


```bash
# Creates a production build of your app. Equivalent to `next build`.
npm run refine build
```
</TabItem>

<TabItem value="remix">

[Refer to the Remix documentation for detailed usage. &#8594](https://remix.run/docs/en/v1/other-api/dev)

```bash
# Starts application in development mode. Equivalent to `remix dev`.
npm run refine dev
```

```bash
# Starts application in production mode. Equivalent to `remix-serve start`.
npm run refine start
```


```bash
# Creates a production build of your app. Equivalent to `next build`.
npm run refine build
```
</TabItem>
</Tabs>

### run
Runs a custom script in the context of your **refine** project. Also It will pass all the arguments to the script.

First it will check `package.json` to see if there is a script with the given name. If there is, it will run that script. Otherwise, it will run in `node_modules/.bin`.

With this way you can run unsupported commands via **refine**.

```bash
npm run refine run react-app-rewired start
```

### whoami
View the details of the development environment.

```bash
> npm run refine whoami

## System:
 - OS: macOS 13.0
 - CPU: (8) arm64 Apple M1 Pro
## Binaries:
 - Node: 16.14.0 - ~/.nvm/versions/node/v16.14.0/bin/node
 - Yarn: 1.22.17 - /opt/homebrew/bin/yarn
 - npm: 8.3.1 - ~/.nvm/versions/node/v16.14.0/bin/npm
## Browsers:
 - Chrome: 107.0.5304.121
 - Firefox: 106.0.3
 - Safari: 16.1

## Refine Packages:
 - @pankod/refine-airtable: 2.1.1
 - @pankod/refine-antd: 3.62.0
 - @pankod/refine-cli: 1.5.1
 - @pankod/refine-core: 3.88.1
 - @pankod/refine-react-hook-form: 3.31.0
 - @pankod/refine-simple-rest: 2.6.0
 - @pankod/refine-strapi: 3.18.0
```
