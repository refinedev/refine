---
id: quickstart
title: Quick Start Guide
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**refine** works on any environment that can run **React** (incl. *Vite, Next.js, Remix, and CRA(Legacy)* etc.)

Although you could take the time to manually set up your environment and install the **refine** packages afterwards, the optimal way to get started with **refine** is using the [Browser-based Scaffolder](https://refine.dev/?playground=true) and **CLI-based Scaffolder**.

Choose one of the methods below to bootstrap a refine app:

<Tabs>
  <TabItem value="Browser-based-scaffolder" label="With Browser-based" default>

This is an efficient tool that allows you to create refine app seamlessly in your browser.

You can choose the libraries and frameworks you want to work with, and the tool will generate a boilerplate code for you.



 1. Navigate to [scaffolder](https://refine.dev/?playground=true) and select libraries and frameworks you want to work with by using interactive UI. 
 2. Download the generated project by clicking on the **"Build & Download"** button.


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

`create refine-app` provides built-in templates for *Vite*, *Next.js*, *Remix*, and *CRA(Legacy)* environments, so you can bootstrap a **refine** project in just a couple of minutes. It also offers a wide range of options that you can easily configure for your *UI framework*, *i18n*, *router*, *Auth.* and *data provider* preferences.

1. To get started, run the following command. The *CLI wizard* will assist you for the rest of the setup process:

```
npm create refine-app@latest
```

2. Once the setup is complete, navigate to the project folder and start your application with:

```
npm run dev
```

<br/>

:::tip
In case you select `Yes` for the `Do you want to add example pages?` option while using the CLI wizard, the refine will add sample CRUD pages utilizing [`refine Inferencer`](https://refine.dev/docs/api-reference/antd/components/inferencer/) and fill the `resources` property.

It is highly recommended to add example pages as it provides a clearer understanding of how **refine** works and lets you test out the CRUD operation functionalities.
:::


  </TabItem>
</Tabs>




<br/>

Now, you can access the refine application at [http://localhost:3000](http://localhost:3000).

You will see the output as a table populated with `blog_posts` and `category` data with filtering, sorting, and pagination features.



<br/>


<div >
   <img style={{width: "100%"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start-example.png" alt="Example result" />
</div>

<br />







## Next Steps

👉 Jump to [Tutorials](https://refine.dev/docs/tutorial/introduction/index/) and continue your work to turn your example project into a full-blown CRUD application! 🚀

👉 Read more on [Advanced Tutorials](https://refine.dev/docs/advanced-tutorials/) for different usage scenarios.

👉 See [real-life examples](https://refine.dev/examples/) built using **refine**
