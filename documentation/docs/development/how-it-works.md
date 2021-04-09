---
id: how-it-works
title: How it Works?
sidebar_label: How it Works?
---

**superplate** is designed to save you hours of development time when starting a new project. Superplate is offering various plugins/tools you can choose from but It's super-easy for you to modify those plugins or create your own ones. Once you are done, you can share your plugins and set **superplate** up to use your custom plugins.

## Creating a Source Repository

We store our plugins apart from the cli to make them easy to modify and easy to create new plugins. You can see the core plugins in [this repo](https://github.com/pankod/next-cli-core-plugins).

- You can prefer to fork the `core-plugins` repo to give you a head start.
- Alternatively, you can create your own source from scratch.

If you choose to start from scratch. All you need to do is create a directory with below structure and create a simple `prompt.js` file inside it.

```bash

├── prompt.js
├── plugins
│   ├── your-first-plugin
│   ├── another-plugin
│   ├── ...

```

**sample `prompt.js`**

```js
{
    prompts: [],
    ignores: [],
}
```

There are many built-in prompt types and options you can use. In `prompt.js` you can also define conditional ignore patterns for superplate to use. To learn more about `prompt.js` please check out [References#prompt.js](references#promptjs)

Superplate offers plugins many ways to interact with each other. To learn how to create a plugin and the ways to interact with others, please read [Creating a Plugin](creating-a-plugin)


## Using a Custom Source

You can use sources from a remote git repository by providing a url or you can use a local repository with providing an absolute or relative path.

:::tip

You can either use `--source <source-path>` or `-S <source-path>` options to pass your source to **superplate**

:::

### Remote Sources

```bash

npx superplate-cli --source https://github.com/path-to-source.git my-project

```

### Local Sources


```bash

npx superplate-cli --source ~/my-local-source my-project

```
