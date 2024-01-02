---
title: Quick Start Guide
displayed_sidebar: mainSidebar
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**Refine** works on any environment that can run **React** (incl. _Vite, Next.js, Remix, and CRA(Legacy)_ etc.)

Although you could take the time to manually set up your environment and install the **Refine** packages afterwards, the optimal way to get started with **Refine** is using the [Browser-based Scaffolder](https://refine.dev/?playground=true) and **CLI-based Scaffolder**.

Choose one of the methods below to bootstrap a Refine app:

<Tabs>
  <TabItem value="Browser-based-scaffolder" label="With Browser-based" default>

This is an efficient tool that allows you to create Refine app seamlessly in your browser.

You can choose the libraries and frameworks you want to work with, and the tool will generate a boilerplate code for you.

1.  Navigate to [scaffolder](https://refine.dev/?playground=true) and select libraries and frameworks you want to work with by using interactive UI.
2.  Download the generated project by clicking on the **"Build & Download"** button.

<div className="flex justify-center">
    <img alt="React admin panel" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-07-25-refine-primereact/create-refine-project.gif" className="border border-gray-200 rounded" />
</div>

<br/>

:::tip

[If you do not want to deal with the installation steps, you can use this pre-configured refine.new template &rarr;](https://refine.new/preview/1a5eb93b-ab9b-4112-b80e-7563b334c025)

:::

<br/>

3. Next, navigate to the project folder, install the dependencies, and then start your project.

```
> npm install

> npm run dev
```

  </TabItem>
  <TabItem value="CLI" label="With CLI-based">

`create refine-app` provides built-in templates for _Vite_, _Next.js_, _Remix_, and _CRA(Legacy)_ environments, so you can bootstrap a **Refine** project in just a couple of minutes. It also offers a wide range of options that you can easily configure for your _UI framework_, _i18n_, _router_, _Auth._ and _data provider_ preferences.

1. To get started, run the following command. The _CLI wizard_ will assist you for the rest of the setup process:

```
npm create refine-app@latest
```

2. Once the setup is complete, navigate to the project folder and start your application with:

```
npm run dev
```

<br/>

:::tip

In case you select `Yes` for the `Do you want to add example pages?` option while using the CLI wizard, the Refine will add sample CRUD pages utilizing [`Refine Inferencer`](/docs/ui-integrations/ant-design/components/inferencer/) and fill the `resources` property.

It is highly recommended to add example pages as it provides a clearer understanding of how **Refine** works and lets you test out the CRUD operation functionalities.

:::

  </TabItem>
</Tabs>

<br/>

Now, you can access the Refine application at [http://localhost:3000](http://localhost:3000).

You will see the output as a table populated with `blog_posts` and `category` data with filtering, sorting, and pagination features.

<br/>

<div >
   <img style={{width: "100%"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start-example.png" alt="Example result" />
</div>

<br />

## Next Steps

👉 Jump to [Tutorials](/docs/tutorial/introduction/index/) and continue your work to turn your example project into a full-blown CRUD application! 🚀

👉 Read more on [Advanced Tutorials](/docs/advanced-tutorials/) for different usage scenarios.

👉 See [real-life examples](/docs/examples/) built using **Refine**
