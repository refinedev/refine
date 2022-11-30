---
id: cli
title: CLI
---

refine CLI is a command line application that allows you to interact with your **refine** project and perform some tasks. This includes adding a new resource, running runners (build, start, dev), managing updates and swizzle components.

## Installation

Install the [@pankod/refine-cli](https://github.com/refinedev/refine/tree/master/packages/cli) library.

```bash
npm i @pankod/refine-cli
```

<Tabs
    defaultValue="cra"
    values={[
        {label: 'Create React App', value: 'cra'},
        {label: 'Nextjs', value: 'nextjs'},
        {label: 'Remix', value: 'remix'}
    ]}
>
<TabItem value="cra">

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

Use this command to add a new resource to your project.

```bash
npm run refine create-resource [resourceName]
```

| Argument     | Description                               |
| ------------ | ----------------------------------------- |
| resourceName | The name of the resource you want to add. |

#### Options

| Alias | Option    | Description                                                           |
| ----- | --------- | --------------------------------------------------------------------- |
| -a    | --actions | Only generate the specified actions. (default: `list`,`create`,`edit`,`show`) |
| -p    | --path    | Path to generate the resource files (default: `src/pages`)            |
| -h    | --help    | Output usage information                                             |
 
#### Examples

Let's create a `Category` resource with all the actions.

```bash
npm run refine create-resource category
```
The following files are produced.

```
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
npm run refine create-resource category --actions list,create
```

```
src/pages/
└── categories
    ├── create.tsx
    ├── index.ts
    └── list.tsx
```

If we want to create these files in another path, use the `--path` option.

```bash
npm run refine create-resource category --path src/resources --actions list,create
```

```
src/resources/
└── categories
    ├── create.tsx
    ├── index.ts
    └── list.tsx
```

### update
Interactively update your outdated **refine** packages. To skip interactive mode, use the `--all` flag to update all outdated **refine** packages to selected tag.
```bash
npm run refine update   
```

#### update Example
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

#### update Options
| Option        | Alias | Description                                                                                    | Values           | Default                                                        |
|---------------|-------|------------------------------------------------------------------------------------------------|------------------|-----------------------------------------------------------     |
| --tag         | -t    | Select version to update to.                                                                   | `latest`, `next` | Version ranges in the `package.json` will be installed.        |
| --all         | -a    | Use to skip interactive mode update and update all `refine` packages to the selected `tag`.    |                  | `false` Interactive mode will be open.                         |
| --dry-run     | -d    | Use to skip automatic installation. Prints the update command of the packages.                 |                  | `false` Selected packages will be installed automatically.     |

### check-updates
Show the running versions of the installed **refine** packages.
```bash
npm run refine check-updates
```

#### check-updates Example
```
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

### dev
Starts the development server of your `react` app. It will detect the framework you are using and start the development server accordingly.
If you are using  `remix`, It will start `remix build` command.
```bash
npm run refine dev
```

### build
Create a production build of your `react` app. It will detect the framework you are using and build the app accordingly. 
If you are using  `remix`, It will start `remix build` command.
```bash
npm run refine build
```

### start
Starts the production server of your `react` app. It will detect the framework you are using and start the production server accordingly. 
If you are using  `create-react-app`, It will start `react-scripts start` command.
```bash
npm run refine start
```
### run
Run a custom command in the context of your **refine** project. It will pass all the arguments to the command.
```bash
npm run refine run <command> [...args]
```

### whoami
View the details of the development environment.
```bash
npm run refine whoami
``` 

#### whoami Example
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


### help