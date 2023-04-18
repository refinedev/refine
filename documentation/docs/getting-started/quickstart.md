---
id: quickstart
title: Quick Start Guide
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**refine** works on any environment that can run **React** (incl. *CRA, Next.js, Remix, Vite* etc.)

Although you could take the time to manually set up your environment and install the **refine** packages afterwards, the optimal way to get started with **refine** is using the [refine.new](https://refine.new/) platform or `create refine-app` project starter tool.

Choose one of the methods below to bootstrap a refine app:

<Tabs>
  <TabItem value="refine-new" label="refine.new" default>

  [refine.new](https://refine.new/) is a powerful tool that lets you create **refine** apps right in your browser. You have the ability to preview, modify, and download your project immediately, thereby streamlining the development process.

 1. Navigate to [refine.new](https://refine.new/?form=true) and select libraries and frameworks you want to work with by using interactive UI. 
 2. Download the generated project by clicking on the **"Build & Download"** button.

<br/>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
     <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif"  alt="quick start gif" />

</div>

<br />

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
  <TabItem value="CLI" label="create refine-app">

`create refine-app` provides built-in templates for *CRA*, *Next.js* and *Remix* environments, so you can bootstrap a **refine** project in just a couple of minutes. It also offers a wide range of options that you can easily configure for your *UI framework*, *i18n*, *router*, *Auth.* and *data provider* preferences.

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
