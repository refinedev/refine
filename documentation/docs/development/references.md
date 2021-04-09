---
id: references
title: References
sidebar_label: References
---

## `prompt.js`

CLI has two built-in prompts; app name and the package manager questions are prompted at the beginning. You can define your prompts in the `prompt.js` at the root of your plugin source. Enquirer's built-in prompts are available to use. You can check them out in the [Enquirer docs](https://github.com/enquirer/enquirer#built-in-prompts). 

You can also apply ignore patterns for your plugins, those ignore glob patterns can be applied project-wide or only for specified plugins. Provide a function with prompt answers to whether the ignore patterns will apply or not.

```ts
prompts: {
    type: string;
    message: string;
    name: string;
    value?: string;
    choices?: string;
    default?: string;
}[];
```
```ts
ignores: {
    plugin?: string[];
    when: (answers: Record<string, string | string[] | boolean>) => boolean;
    pattern: string[]
}[];
```

**Example**

```js

module.exports = {
    prompts: [
        {
            message: "CSS Preprocessor:",
            name: "css_features",
            type: "select",
            choices: [
                {
                    message: "None",
                    name: "css",
                },
                { message: "sass/scss", name: "scss" },
                { message: "styled-components", name: "styled" },
            ],
            default: "css",
        },
        {
            message: "Do you also want to add styled-system ?",
            name: "styled-system",
            type: "confirm",
            skip: ({ answers }) => answers.css_features !== "styled",
        },
    ],
    ignores: [
        {
            plugin: ["styled-components"],
            when: function (answers) {
                return answers["styled-system"] === true;
            },
            pattern: ["src/components/**", "pages/index.tsx"],
        },
    ]
};

```

---

## `package.json`

Place your package.json configuration such as `dependencies` or `scripts`. Content of this file will be merged with the other selected plugins.

**Example**
```json
{
    "dependencies": {
      "styled-components": "^5.2.1"
    },
    "devDependencies": {
      "babel-plugin-styled-components": "^1.12.0"
    }
}
```

---

## `package.js`

You can derive your packages for given answers to the prompts. Export an object with apply function, CLI will call it with two parameters; first parsed `package.json` of the plugin and second the given answers to the prompts.

:::tip

We recommend to place all your dependencies in the plugins `package.json` file and delete them in the `package.js` if necessary. This is a better practice for the maintainability of your plugin.

:::

**Parameters**

- `package: Record<string,unknown>` : Parsed package.json
- `answers: string[]` : Prompt answers in an array

**Example**

```js
module.exports = {
    apply(package, answers) {

        if (answers.includes("other-plugin")) {
            delete package.devDependencies["not-needed-anymore-package"];
        }
        
        return package;
    },
};

```

---

## `extend.js`

In some plugins, we have a need to alter the `_app` and `_document` of Next.js. You may need these values as well or custom properties to apply in other plugin templates.

**Properties**

`_app?: { import: string[]; inner: string[]; wrapper: [string, string][] }`

These values will append accordingly to the `_app.tsx` file.

`_document?: { import: string[]; initialProps: string[] }` 

These values will append accordingly to the `_document.tsx` file.

`[key: string]: unknown`

You can define custom properties in plugin's extend file and use them in your projects. These values will be passed as a template data to EJS.

In `core-plugins`, we've defined a property named `testSetup` to provide appropriate wrappers to the testing environment. 

**Example**
```
const base = {
    _app: {
        import: ['import "tailwindcss/tailwind.css";'],
        inner: [],
        wrapper: [],
    },
};

module.exports = {
    extend() {
        return base;
    },
};
```

---

## `tsconfig.json`

When you define a `tsconfig.json` file in your plugin, it will be ignored while moving the plugin content to target directory. Instead, your TypeScript config will be merged with the others to avoid breaking other plugins. 

**Example**

**`first-plugin/tsconfig.json`**
```js
{
    "compilerOptions": {
        "paths": {
            "@components/*": ["src/components"],
        }
    }
}
```
**`second-plugin/tsconfig.json`**
```js
{
    "compilerOptions": {
        "paths": {
            "@styles/*": ["src/styles"],
        }
    }
}
```

**`target-dir/tsconfig.json`**
```js
{
    "compilerOptions": {
        "paths": {
            "@components/*": ["src/components"],
            "@styles/*": ["src/styles"],
        }
    }
}
```

---

## `.babelrc`

Content of your `.babelrc` file will be ignored when moving the plugin's content to the target directory. Instead this file's content will be merged with the others to prevent breaking other plugins' config.

```json
{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}
```

---

## `meta.json`

A Brief information about the plugin. You can give it a name, description and a url to the docs.

**Example**

```json
{
    "slug": "my-plugin",
    "name": "My Plugin",
    "description": "A plugin to do great things.",
    "url": "https://url-to-docs/my-plugin",
}
```

---

## Templates

This section hasn't been written yet.

