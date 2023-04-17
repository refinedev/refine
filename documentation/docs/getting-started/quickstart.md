---
id: quickstart
title: Quick Start Guide
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**refine** works on any environment that can run **React** (incl. *CRA, Next.js, Remix, Vite* etc.)

Although you could take the time to manually set up your environment and install the **refine** packages afterwards, the optimal way to get started with **refine** is using the [refine.new](https://refine.new/) online platform or `create refine-app` project starter tool.


<Tabs>
  <TabItem value="refine-new" label="refine.new" default>

[refine.new](https://refine.new/) is a powerful tool that lets you create **refine** apps right in your browser. You have the ability to preview, modify, and download your project immediately, thereby streamlining the development process.

Building **refine** CRUD apps with [refine.new](https://refine.new/) is very straight forward. You can choose the libraries and frameworks you want to work with, and the tool will generate the project.



You can download the project code by clicking on the *"Build & Download"* button.

Once the setup is complete, navigate to the project folder install depencies and then start your project.

```
npm install
```

  </TabItem>
  <TabItem value="CLI" label="create refine-app">

`create refine-app` provides built-in templates for *CRA*, *Next.js* and *Remix* environments, so you can bootstrap a **refine** project in just a couple of minutes. It also offers a wide range of options that you can easily configure for your *UI framework*, *i18n*, *router*, *Auth.* and *data provider* preferences.

To get started, please run the following command. The **CLI wizard** will assist you for the rest of the setup process:

```
npm create refine-app@latest my-project
```

It will create your **refine** project and install the required packages according to your selections.

Once the setup is complete, navigate to the project folder and start your application with:

  </TabItem>
</Tabs>



```
npm run dev
```

<br/>

You can now view **refine** application at [http://localhost:3000](http://localhost:3000)

## Quick Start Example



We will show how to bootstrap a **refine** app with [Ant Design](https://ant.design/), [React](https://reactjs.org/) and *REST API* by using [refine.new](https://refine.new/) and `create refine-app`. You may prefer use [Material UI](https://material-ui.com/), [Chakra UI](https://chakra-ui.com/) and [Mantine](https://mantine.dev/) as well.

Choose one of the methods below to proceed:

<Tabs>
  <TabItem value="refine-new" label="refine.new" default>

Navigate to [refine.new](https://refine.new/), click on the *"Let's Start"* button and select the following options to complete wizard:

**React Platform**: Create React App  
**UI Framework**: Ant Design  
**Backend**: REST API  
**Authentication Provider**: No Auth

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


After the project has been generated, you can download the code by clicking on the "Build & Download" button.  

Next, navigate to the project folder, install the required npm dependencies, and then start your project.

```
npm install
```




  </TabItem>
  <TabItem value="CLI" label="create refine-app">

To get started, please run the following command. The CLI wizard will assist you for the rest of the setup process:

```
npm create refine-app@latest  my-antd-project
```

<br/>

Select the following options to complete **CLI wizard**:

```
? Choose a project template:
❯ refine(CRA)

? Choose your backend service to connect:
❯ REST API

? Do you want to use a UI Framework?:
❯ Ant Design

? Do you want to add example pages?
❯ Yes

? Do you need any Authentication logic?:
❯ No

? Do you need i18n (Internationalization) support?:
❯ No
```


:::tip
In case you select `Yes` for the `Do you want to add example pages?` option while using the CLI wizard, the refine will add sample CRUD pages utilizing [`refine Inferencer`](https://refine.dev/docs/api-reference/antd/components/inferencer/) and fill the `resources` property in the application. You can explore these example pages to test out the CRUD operation functionalities.

It is highly recommended to add example pages to your project as it provides a clearer understanding of how **refine** works.
:::

Once the setup is complete, navigate to the project folder and start your project with:

  </TabItem>
</Tabs>

```
npm run dev
```


The **refine** application can now be accessible at [http://localhost:3000](http://localhost:3000).  

You will see the output as a table populated with `blog_posts` and `category` data with filtering, sorting, and pagination features.

<div >
   <img style={{width: "100%"}} src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start-example.png" alt="Example result" />
</div>

<br />



## Next Steps

👉 Jump to [Tutorials](https://refine.dev/docs/tutorial/introduction/index/) and continue your work to turn your example project into a full-blown CRUD application! 🚀

👉 Read more on [Advanced Tutorials](https://refine.dev/docs/advanced-tutorials/) for different usage scenarios.

👉 See [real-life examples](https://refine.dev/examples/) built using **refine**
