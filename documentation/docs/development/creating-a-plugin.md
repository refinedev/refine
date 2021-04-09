---
id: creating-a-plugin
title: Creating a Plugin
sidebar_label: Creating a Plugin
---

You may need to add and modify some files to properly set up libraries with your Next.js project. What we call **plugin** is a directory with all the packages you need to install and the files you need to add and modify.

This article will show you how to create a superplate plugin from scratch and the ways superplate offers you to interact with other plugins in your source. 

Let's create a plugin to add [styled-components](https://styled-components.com) to our project easily. 

### Creating a Plugin Directory

Let's start with creating a directory for our plugin inside our source's `plugins` directory.

```bash
mkdir plugins/styled-components
```

### Adding Plugin to the Prompts

We need to add our plugin to appropriate place in `prompt.js` file. We can ask the user for a styling and place `styled-components` inside it.

```js
module.exports = {
    prompts: [
        {
            name: "styling",
            message: "How would you like to style your apps?",
            type: "select",
            choices: [
                { message: "None", name: "none" },
                { message: "styled-components", name: "styled-components" },
            ],
            default: "none",
        },
    ]
}
```

:::warning
Make sure `name` or `value` property for the choice is the same with the directory name you've created.
:::

## Creating a `package.json`

Let's create a `package.json` inside the plugin directory. We need to add `styled-components` package and the `babel-plugin-styled-components` to properly support SSR. 

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

## Modifying `package.json` with User Answers

Let's say that we want to prompt the users, asking them if they want to include the support for SSR.

We can do so by simply modifying our `prompt.js`. Append below codes to your prompts array. 

```js
{
    name: "ssr",
    message: "Do you want styled-components to support SSR?",
    // This will be a Yes/No question
    type: "confirm",
    // We want to skip this question if styled-components is not selected.
    skip: ({answers}) => answers.styling !== "styled-components",
}
```

And if this prompt is not answered *Yes* we want to remove the babel plugin from `devDependencies`. We can do that by creating a `package.js` inside our plugin.

```js
module.exports = {
    /**
     * package: the current content of your package.json
     * answers: array of given user answers to the prompts 
     */
    apply(package, answers) {
        if (answers.ssr === false) {
            delete package.devDependencies[
                "babel-plugin-styled-components"
            ];
        }
        return package;
    },
};
```

:::info

We will be handling this plugin later in [Custom `.babelrc`](#custom-babelrc) section.

:::

## Using Templates

We have handled the dependencies for our plugin. Now, let's add an example component. First, we need two files `styled.ts` and `example.tsx`. We will place them under `plugins/styled-components/src/components/example`.

`styled.ts`
```ts
import styled from "styled-components";

export const StyledContainer = styled.main`
    padding: 1rem;
    margin: 0 auto;
    max-width: 32rem;
`;
```

`example.tsx`
```tsx
import React from "react";
import { StyledContainer } from "./styled";

export const ExampleComponent: React.FC = () => {
    return (
        <StyledContainer>
            <h2>This is an example component with styled-components</h2>
            <%_ if (answers.ssr === true) { _%>
            <small>and with SSR!</small>
            <%_ } _%>
            <p>some text</p>
        </StyledContainer>
    )
}
```

:::info

We can use EJS in our files. superplate will process all ejs templates while creating a project. If you want to learn more about the available template data; please check out [References#templates](references#templates)

:::

### Modifying the `App` and the `Document`

[styled-components](https://styled-components.com/docs/advanced#theming) has full support for theming. In order to use themes in our entire app; we need to modify Next.js's App component. **superplate**'s base template allows you to modify `App` and `Document`; to wrap styled-component's `ThemeProvider` we need to create an `extend.js` file.

:::info

**superplate** will merge all `extend.js` content and pass it to your templates. You only need to cover modifications for your plugin in plugin's `extend.js` file.

:::

```js
const base = {
    _app: {
        // _app.import will be appended to the import section in pages/_app.tsx file.
        import: [
            'import { ThemeProvider } from "styled-components";',
        ],
        // _app.inner will be appended to the inner code section of the custom App.
        inner: [
            `const theme = {
                main: "mediumseagreen"
            }`,
        ],
        // _app.wrapper will wrap the return statement of the custom App.
        wrapper: [["<ThemeProvider theme={theme}>", "</ThemeProvider>"]],
    },
};

module.exports = {
    extend() {
        return base;
    },
};
```

Since we try to add SSR support. We also need to modify the custom `Document`. Let's add the necessary lines for `_document.tsx` and only apply them if we select ssr support.

```js
const base = {
    _app: {
        import: [
            'import { ThemeProvider } from "styled-components";',
        ],
        inner: [
            `const theme = {
                main: "mediumseagreen"
            }`,
        ],
        wrapper: [["<ThemeProvider theme={theme}>", "</ThemeProvider>"]],
    },
    _document: {
        import: ['import { ServerStyleSheet } from "styled-components";'],
        initialProps: [
            `const sheet = new ServerStyleSheet();
            const originalRenderPage = ctx.renderPage;
            try {
                ctx.renderPage = () =>
                    originalRenderPage({
                        enhanceApp: (App) => (props) =>
                            sheet.collectStyles(<App {...props} />),
                    });
                const initialProps = await Document.getInitialProps(ctx);
                return {
                    ...initialProps,
                    styles: (
                        <>
                            {initialProps.styles}
                            {sheet.getStyleElement()}
                        </>
                    ),
                };
            } finally {
                sheet.seal();
            }`,
        ],
        wrapper: [],
    },
};

module.exports = {
    extend(answers) {
        if (!answers.ssr) {
            // Remove _document modifications if ssr is false.
            delete base._document;
        }
        return base;
    },
};
```

### Defining Custom Data

We're done for `_app` and `_document` but in many plugins you may need different template data for each plugin. You can define and return custom data to your templates for every plugin. We used `testSetup` property to handle wrappers in **superplate**'s core plugins `testing-library` and `enzyme`. These custom properties will be merged as well as `_app` and `_document`. Here's an example for custom template data.

```js
const base = {
    testSetup: {
        import: [
            'import { ThemeProvider } from "styled-components";',
        ],
        inner: [
            `const theme = {
                main: "mediumseagreen"
            }`,
        ],
        wrapper: [["<ThemeProvider theme={theme}>", "</ThemeProvider>"]],
    },
};

module.exports = {
    extend() {
        return base;
    },
};
```

:::info
We will not cover `testing-library` and `enzyme` plugins in this article but if you wish to learn more about them; you can check out [superplate-core-plugins/react-library](https://github.com/pankod/superplate-core-plugins/tree/master/plugins/testing-library).
:::

## Custom `tsconfig.json`

**superplate** will take care of your plugin's `tsconfig.json` file just like your `package.json` and it will merge every custom config you define when you create a new project. We've created an example component with styled-components. Let's add a path alias for our `components` directory in our `tsconfig.json`.


```json
{
    "compilerOptions": {
        "paths": {
            "@components/*": ["src/components/*"],
            "@components": ["src/components"],
        }
    }
}
```

## Custom `.babelrc`

We will need a babel plugin to ensure consistency between the server and the client. Let's create a `.babelrc` file in our plugin to tell babel to use this plugin. **superplate** will merge all babel config to one just like `package.json` and `tsconfig.json` files.

```json
{
  "presets": ["next/babel"],
  "plugins": [["styled-components", { "ssr": true }]]
}
```

## Providing a Plugin Description

We're using `meta.json` to collect data about plugins. You can provide an url to the docs and a description for your plugin in `meta.json`. Here's what we will use for `styled-components` plugin:

```json
{
    "name": "Styled Components",
    "description": "Utilising tagged template literals (a recent addition to JavaScript) and the power of CSS, styled-components allows you to write actual CSS code to style your components.",
    "url": "https://styled-components.com/docs"
}
```

## Conclusion

We've created a plugin from scratch to add `styled-components` to our next project with **superplate**. If you want to check out how we created different plugins, please check out [superplate-core-plugins](https://github.com/pankod/superplate-core-plugins). To learn more about superplate's API, you can check out [References](references).

