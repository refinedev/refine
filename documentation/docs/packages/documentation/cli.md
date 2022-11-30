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
### help