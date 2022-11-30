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
| -a    | --actions | Only generate the specified actions. (default: list,create,edit,show) |
| -p    | --path    | Path to generate the resource files (default: "src/pages")            |
| -h    | --help    | Output useage information                                             |
 
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

### check-updates
### dev
### build
### start
### run
### whoami

`whoiam` gives information about the system. This will help to solve the problem. It produces an output like the one below.

```bash
npm run refine whoiam

## System:
 - OS: macOS 13.0.1
 - CPU: (8) arm64 Apple M1
## Binaries:
 - Node: 16.18.0 - /opt/homebrew/opt/node@16/bin/node
 - Yarn: 1.22.19 - /opt/homebrew/bin/yarn
 - npm: 8.19.2 - /opt/homebrew/opt/node@16/bin/npm
## Browsers:
 - Chrome: Not Found
 - Firefox: 107.0
 - Safari: 16.1

## Refine Packages:
 - @pankod/refine-antd: 3.62.0
 - @pankod/refine-core: 3.90.2
 - @pankod/refine-react-router-v6: 3.36.4
 - @pankod/refine-simple-rest: 3.35.2
```

### help