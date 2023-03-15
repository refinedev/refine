---
id: quickstart
title: Quick Start Guide
---

**refine** works on any environment that can run **React** (incl. _CRA, Next.js, Remix, Vite_ etc.)

Although you could take the time to manually set up your environment and install the **refine** packages afterwards, the optimal way to get started with **refine** is using the project starter tool.

`create refine-app` provides built-in templates for _CRA_, _Next.js_ and _Remix_ environments, so you can bootstrap a **refine** project in just a couple of minutes. It also offers a wide range of options that you can easily configure for your _UI framework_, _i18n_, _router_, _Auth._ and _data provider_ preferences.

To get started, please run the following command. The **CLI wizard** will assist you for the rest of the setup process:

```
npm create refine-app@latest my-project
```

It will create your **refine** project and install the required packages according to your selections. After completing the setup, navigate to the project folder and start your application with:

```
npm run dev
```

<br/>

You can now view **refine** application at [http://localhost:3000](http://localhost:3000):

## Quick Start Example

We will now show how you can use the CLI to bootstrap a **refine** app with [Ant Design](https://ant.design/) and [React](https://reactjs.org/). You can also use [Material UI](https://material-ui.com/), [Chakra UI](https://chakra-ui.com/) and [Mantine](https://mantine.dev/) as well.

```
npm create refine-app@latest  my-antd-project
```

<br/>

Select the following options to complete **CLI wizard**:

```
? Select your project type:
❯ refine-react

? Do you want to use a UI Framework?:
❯ Ant Design

? Do you want a customized theme?:
❯ Default theme

? Router Provider:
❯ React Router v6

? Data Provider:
❯ REST API

? Auth Provider:
❯ None

? Do you want to add example pages?
❯ Yes

? Do you want a customized layout?
❯ No
```

:::info
We are showing only the important options with this example. You can prefer to select other options like [Kbar](https://github.com/timc1/kbar) and [i18n](https://www.i18next.com/) but different options selections may be result in a different project structure.
:::

<br/>

Once the setup is complete, navigate to the project folder and start your project with:

```
npm run dev
```

<br/>

You can now view your **refine** application at [http://localhost:3000](http://localhost:3000). You should see the output as a table populated with `post` and `category` data with filter, sort, and pagination features

<div >
   <img style={{width: "100%"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/first-example-result.png" alt="Example result" />
</div>

<br />

:::tip
If you say `Yes` to the `Do you want to add example pages?` option during the CLI wizard, refine will add example CRUD pages and the `resources` prop to your app. You can navigate to the example pages to try out the CRUD operation features

We always recommend adding examples pages to your project to get a better understanding of how **refine** works.
:::

## Next Steps

👉 Jump to [Tutorials](../tutorial/0-introduction/0-intro.md) and continue your work to turn your example project into a full-blown CRUD application! 🚀

👉 Read more on [Advanced Tutorials](https://refine.dev/docs/advanced-tutorials/) for different usage scenarios.

👉 See [real-life examples](https://refine.dev/examples/) built using refine
