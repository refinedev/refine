---
title: Build a Progressive Web App (PWA) with Next.js
description: We will walk you through the entire process of building a PWA using Next.JS and refine framework, from start to finish!
slug: next-js-pwa
authors: david_omotayo
tags: [nextjs, tutorial, refine]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-11-next-refine-pwa/social.png
featured_image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-11-next-refine-pwa/featured.png
hide_table_of_contents: false
---

:::caution

This post was created using version 3.x.x of **refine**. Although we plan to update it with the latest version of **refine** as soon as possible, you can still benefit from the post in the meantime.

You should know that **refine** version 4.x.x is backward compatible with version 3.x.x, so there is no need to worry. If you want to see the differences between the two versions, check out the [migration guide](https://refine.dev/docs/migration-guide/).

Just be aware that the source code example in this post have been updated to version 4.x.x.

:::







 



## Introduction

Building a complex site requires a one-size-fits-all framework that not only simplifies the complexity but also integrates seamlessly with other build tools on a whim.

Over the years, frameworks and libraries such as React have been the go-to packages for building complex and large applications, even in the face of their susceptible nature to tiresome caveats. 

Fast forward to today, there are several frameworks and libraries in the picture, and they all promise to do a better job than their predecessors. However, many still don't meet the flexibility mark, except for a handful of them.  

In this article, we'll look at what refine is and demonstrate how to use it to build a **Next.js PWA** storefront application.
<!--truncate-->

Steps we'll cover:
- [What is a PWA?](#what-is-a-pwa)
- [Project Setup](#project-setup)
- [Adding Tailwind CSS for styling](#adding-tailwind-css-for-styling)
- [Refine core setup](#refine-core-setup)
- [Adding a Data provider](#adding-a-data-provider)
- [Adding a Layout component](#adding-a-layout-component)
- [Adding Resources](#adding-resources)
- [Using Next.js SSR](#using-nextjs-ssr)
- [Creating product cards](#creating-product-cards)
- [Creating ProductList](#creating-productlist)
  - [Using the useTable hook](#using-the-usetable-hook)
- [Generating PWA manifest](#generating-pwa-manifest)
- [Configuring PWA](#configuring-pwa)

## Prerequisites
refine templates are shipped with Typescript by default. This is because Typescript is the recommended language for writing refine applications. 

So to follow along with this tutorial, you should have a fundamental knowledge of Typescript and its concepts and the following:

- The latest version of Node.js installed on your machine
- Fundamental knowledge of Next.js and React
- Basic understanding of tailwindcss

## What is refine?

[refine](https://github.com/refinedev/refine) is an open-source React-based headless framework for rapidly building data-driven applications. It offers immense development speed without any customization or significant functionality tradeoffs. refine's use-case includes **admin panels**. 

At its core, refine is a collection of helper hooks, components, and providers that give you complete control over your application's user interface. These hooks are similar to what you'd find in React query, meaning refine will automatically handle your data-fetching logic, authorizations, state management, and internalization out of the box. 

The decoupled nature of these hooks makes it easy to incorporate your desired UI customizations and code flow. Although integrated with design systems such as Ant design and Material UI out of the box, refine is designed to work seamlessly with any other **UI frameworks**.



## What is a PWA?

PWA stands for **progressive web application**. It is an application built with web technologies such as HTML, CSS, and JavaScript. However, it also delivers functionalities and emulates the characteristics of a native application. 

PWAs offer features that make them operate both as a web page and a mobile application with access to native-like features such as push notifications, offline mode, and much more. 

Unlike actual native applications, PWAs are not difficult to develop. With just an addition of a service worker and a manifest to an existing web page, you can create an application that not only lives on the but also serve as a native application that is platform-agnostic without having to learn programming languages that are specific to such platforms.

**PWA** is a good choice for e-commerce operators that want to get on the mobile-first e-commerce bandwagon without having to go through the troubles of integrating with different app stores. While also retaining the perks a web page has to offer, such as discoverability via search engines and Responsiveness. 


## Project Setup
Although it is possible to integrate refine into an existing Next.js project, it is recommended to set up a project using the [superplate](https://pankod.github.io/superplate/) command-line interface (CLI), as it sets things up according to your preferences. 

Open up your command line tool, cd to your folder of choice, and run the following command to bootstrap a Next.js refine template:

```
npm create refine-app@latest refine-storefront -- -p refine-nextjs -b v3
```

After running the command, you’ll be prompted to choose your preferences for the project. Select the following options to proceed:

 <div class="img-container">
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-11-next-refine-pwa/cli.png" alt="cli" />
</div>

<br/>



## Adding Tailwind CSS for styling

After installation, cd into the newly created project folder and run the following command:

```npm i -D tailwindcss postcss autoprefixer next-pwa ```

This command will install Tailwind and other packages we’ll be using for this tutorial, such as:


- tailwindcss
- next-pwa


Next, we’ll configure Tailwind and start the development server. First, go back to your terminal and run the command below:

```
npx tailwindcss init -p
```

This command will generate tailwind and postcss config files in the root folder of our project. 

Next, open the tailwind.config.js file and add the path to all your template files like so:

```tsx title="tailwind.config.js"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Create an src folder in the root folder of the project. Inside it, create a styles subfolder and add a globals.css file. 



Open the global.css file, and add the @tailwind directives for each of Tailwind layers at the top of the file:
```tsx title="global.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Lasty, import global.css into `pages/_app.tsx`

```tsx
import 'src/styles/global.css';
```

That’s it! Now we can use Tailwind utility classes in our project. 



## Refine core setup

Superplate’s Next.js template is pre-configured with refine out of the box, so all we have to do now is to complete the setup by adding a layout, resources, and data provider to the refine component. 

As a first step, navigate to the `_app.tsx` file inside the pages folder. When you open the file, you should see something similar to the following:

```tsx title="pages/_app.tsx"
import React from "react";
import { AppProps } from "next/app";
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/nextjs-router";
import dataProvider from "@refinedev/simple-rest";
 
const API_URL = "https://api.fake-rest.refine.dev";
 
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL)}
    >
      <Component {...pageProps} />
    </Refine>
  );
}
 
export default MyApp;
 ```

 This is where most of our app’s functionalities will be configured. Right now, nothing much is going on - the refine component is being used to wrap our entire app, with a `routerProvider` and a `dataProvider` hook passed to it as props.

We’ll see how to leverage these hooks and other props of the refine component in the subsequent sections. But first, let’s configure the `dataProvider` hook for our needs.

Run npm run dev to start the refine development server.

Within seconds it should automatically bring up your default browser with the preview of the app. If it does not, open the browser manually and navigate to http://localhost:3000.


 <div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-11-next-refine-pwa/welcome.png" alt="welcome" />
</div>


## Adding a Data provider 
Data providers are hooks that refine use to communicate with APIs. They act as adapters that make HTTP requests to different APIs and return response data using predefined methods.

refine comes with different data providers out of the box, but the one we’re interested in and will be using in this tutorial is the [refine-simple-rest](https://github.com/refinedev/refine/tree/master/packages/simple-rest) data provider, a data provider for communicating with RESTful APIs. Visit the docs to learn more about refine’s data providers.

We’ll be using the fake store API to populate our storefront prototype app, and since it’s a REST API, the refine-simple-rest data provider won’t have trouble communicating with it.

To add a data provider to our app, we’d have to install a data provider package (in our case, the refine-simple-rest data provider), import it into the `_app.tsx` file, and add it to the refine component with the API endpoint passed to it.

Fortunately for us, superplate has done all the heavy lifting for us, now all we have to do is replace refine’s fake API endpoint: 


```diff title="pages/_app.tsx"
 ...
- const API_URL = "https://api.fake-rest.refine.dev";
 ...

With our Fake store endpoint:

 ...
//highlight-next-line
+ const API_URL = "https://fakestoreapi.com";
 ...
 ```

 Next, we’ll create a layout component for our app and pass it as a prop to the refine component.

[Refer to documentation for more information about data providers in refine. &#8594](https://refine.dev/docs/core/providers/data-provider/)

<br/>
<div>
<a href="https://github.com/refinedev/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/github-support-banner.png" alt="github support banner" />
</a>
</div>


 ## Adding a Layout component
A Layout component is a component that refine uses to create a template for our app. The template is independent of the app’s default UI, thus giving us the option to design as many templates as possible. 

The default layout takes a child argument that accepts components that can be used to further customize and structure the template. These child components are regarded as layout parameters.

To get started, create a components sub-folder inside the src folder, Next, create a `Layout.tsx` file inside it and add the following code:

```tsx title="src/Layout.tsx"
import * as React from 'react';
import { LayoutProps } from '@refinedev/core';

export const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="bg-red">
            <div className="py-8 px-24 sticky top-0 z-50 bg-[#fff] relative flex justify-between items-center">
                <a href="https://refine.dev">
                    <img src="./refine_logo.png" alt="refine logo" />
                </a>
                <button className="outline outline-[#D6D58E] outline-offset-2 py-2 px-8 bg-[#042940] w-fit text-white rounded mt-2 mb-2">
                    Cart
                </button>
            </div>
            <div className="grid-rows-3">{children}</div>
        </div>
    );
};
 ```

The code above is relatively straightforward, we created a functional component structure with a destructured children argument. In the returned JSX code, we created a navbar with the refine logo and a cart button, and below it is the children argument rendered dynamically to the template.

To understand how the children argument works, we need to take a look at the `<LayoutWrapper>` component and how it works.

The `<LayoutWrapper>` component is used to wrap the contents of a component or custom page that will be rendered to refine’s default layout. 

Suppose we want to render the content of a list component to refine’s layout, we would go about it like so:

```tsx
const List: React.FC<Props> = () => {
    return (
        <LayoutWrapper>
            <ul>
                <li>Groceries</li>
                <li>Workout</li>
                <li>Work</li>
            </ul>
        </LayoutWrapper>
    );
};

export default ProductCards;
```


The wrapped unordered list in the code above will be rendered below the navbar we created inside the Layout component earlier, in the same spot we're dynamically rendering the children argument. What this means is that the content of the list component is being passed as a child to the Layout component via the `<LayoutWrapper>` component.



Now that we have a basic understanding of how refine's Layout works, let's go ahead and add our Layout component to the refine component.

Navigate back to the `_app.tsx` file, import the Layout component we just created and add it to the refine component like so:

```tsx title="pages/_app.tsx"
... 
//highlight-next-line
import { Layout } from "@components/Layout";
 
const API_URL = "https://fakestoreapi.com";
 
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL)}
      //highlight-next-line
      Layout={Layout}
    >
      <Component {...pageProps} />
    </Refine>
  );
}
 
export default MyApp;
```

If you save your progress at this point and go to the browser, you won’t notice any significant change. This is because we’re yet to add resources to the refine component.


## Adding Resources
The resources prop is used to map a specific endpoint of the provided API to refine. The prop takes an array of properties, such as the name and list property. 
    
```
resources={[{ name: "endpoint name", list: ListPage, ... }]}
```
The name property is the most important resource property. It is used to specify an endpoint from the provided API, which refine, then automatically creates a route for our app. 

For example, if we add a “products” value to the name property like so:

```
resources={[{ name: "products" }]}
```

refine will utilize the `/products` endpoint from the API and append it to our URL: http://localhost:3000/products.

Since we don’t have a list to render in our app, all we need to do is add a name property with a `products` value to our refine resources prop:


```tsx title="pages/_app.tsx"
...
 
function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(API_URL)}
      Layout={Layout}
      //highlight-next-line
      resources={[{ name: "products" }]}
    >
      <Component {...pageProps} />
    </Refine>
  );
}
 
export default MyApp;
```
    
Now if you save your progress and go back to the browser, you should see the Layout component rendered successfully.

 <div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-11-next-refine-pwa/layout.png" alt="layout" />
</div>

<br/>

## Using Next.js SSR
refine handles data management automatically out of the box. It uses react-query under the hood to fetch and manage predefined data from APIs. 

This way, we don’t have to write data-fetching logic because the content of the API endpoint that we added to the refine component earlier will be readily available to every component in the application via hooks such as useTable and Typography. 

However, to leverage Next.js’ pre-rendering features (SSR or SSG), we’d have to manually fetch the data using a refine `dataProvider` from a `getServerSideProps` or `getStaticProps` function.

To go about this, navigate to the `index.tsx` file inside the pages folder and add the following code:

```tsx title="pages/index.tsx"
import { GetServerSideProps } from "next";
import dataProvider from "@refinedev/simple-rest";
 
interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
 
export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await dataProvider("https://fakestoreapi.com").getList<IProduct>(
    {
      resource: "products",
    }
  );
  return {
    props: { products: data },
  };
};
```

Let’s breakdown what’s going on here:

First, we imported the `GetServerSideProps` type and the `dataProvider` hooks at the top of the files and created an interface for the data we’ll be fetching.

Next, we created a `getServerSideProps` function where we’re fetching the data using the `dataProvider` hook and assigned the response data to a data variable.

Then we chain the `getList` method to the `dataProvider` to specify the endpoint to retrieve via the resources property.

Lastly, we exposed the data variable by passing it to the props object.



[Refer to official refine docs for more information about Next.js usage. &#8594](https://refine.dev/docs/guides-and-concepts/ssr/nextjs/)

## Creating product cards
Navigate back to the components folder and create a `ProductCard.tsx` file, then add the following codes:

```tsx title="components/ProductCards.tsx"
import * as React from 'react';

export interface Props {
    price: number;
    category: string;
    title: string;
    description: string;
    cardImage: string;
}

const ProductCards: React.FC<Props> = ({
    price,
    title,
    category,
    description,
    cardImage,
}) => {
    return (
        <div className="max-w-xs pb-2 outline outline-[#042940] relative">
            <div className="bg-[#fff] flex justify-center items-center py-4 relative">
                <img
                    src={cardImage}
                    alt={`${title}`}
                    className="max-w-xs h-56 transition ease-in-out delay-150 duration-300 hover:-translate-y-1 hover:scale-110 z-30"
                />
            </div>
            <div className="px-4">
                <p className="text-lg text-black font-semibold mb-1">{title}</p>
                <div className="flex justify-between">
                    <p className="outline outline-[#D6D58E] outline-offset-2 p-1 bg-[#042940] w-fit text-white rounded mt-2 mb-2">
                        ${price}
                    </p>
                    <button className="outline outline-[#D6D58E] outline-offset-2 p-1 bg-[#042940] w-fit text-white rounded mt-2 mb-2">
                        Add to cart
                    </button>
                </div>
                <p>{`${(description || []).slice(0, 100)}`}...</p>
                <p className=" px-2 py-0.5 py text-sm bg-[#D6D58E] w-fit text-gray-600 rounded-3xl mt-2">
                    {category}
                </p>
            </div>
        </div>
    );
};

export default ProductCards;
```

Here, we’re destructuring several props and rendering them to the component’s template, nothing special.

Next, we’ll create a `Productlist` component and demonstrate how we can use the `useTable` hook to access our data.

## Creating ProductList 

Create a `ProductList` component just above the `getServerSideProps` function inside the index.tsx file and pass the `products` property to it as a prop.  

Also import the `ProductCards` and the `LayoutWrapper` components like highlighted code block below:




```tsx title="pages/index.tsx"
import { GetServerSideProps } from 'next';
import dataProvider from '@refinedev/simple-rest';
 //highlight-start
import { GetListResponse, LayoutWrapper, useTable } from '@refinedev/core';
import ProductCards from '@components/ProductCard';
 //highlight-end

interface IProduct {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}
 //highlight-start
type ItemProp = {
    products: GetListResponse<IProduct>;
};
 //highlight-end

const ProductList: React.FC<ItemProp> = ({ products }) => {
  //highlight-start
    const { tableQueryResult } = useTable<IProduct>({
        resource: 'products',
        queryOptions: {
            initialData: products,
        },
    });
  //highlight-end

    return (
       //highlight-start
        <LayoutWrapper>
            <div className="grid grid-cols-4 gap-6 px-24 my-8">
                {tableQueryResult.data?.data.map((product) => {
                    return (
                        <ProductCards
                            key={product.id}
                            title={product.title}
                            category={product.category}
                            description={product.description}
                            cardImage={product.image}
                            price={product.price}
                        />
                    );
                })}
            </div>
        </LayoutWrapper>
        //highlight-end
    );
};

export default ProductList;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const data = await dataProvider("https://fakestoreapi.com").getList<IProduct>(
    {
      resource: "products",
    }
  );
  return {
    props: { products: data },
  };
};

```
### Using the useTable hook

`useTable` is a refine hook that uses helper hooks to simplify the process of fetching, interacting, and rendering data. To put things into perspective, we’ll use the `useTable` hook to process our response data from the `getServerSideProps` function.

In the code above, we’re using `tableQueryResult` to map through the query results and passing them as props to the `ProductCards` component. Then we wrapped the component with the LayoutWrapper component. 

What we’re doing here is similar to what we did earlier with the resources prop, we specify which source (endpoint) to be fetched from the API by passing the resource option a string value. In this case, `products`.

The only difference is that we added a `queryOptions` option and passed the products prop as its initial data. Then we destructed the `tableQueryResult` object from the `useTable` hook. This is what we’ll use to get the result of our query.

Also we created a `ProductCard` component and use it to render the query results using the `tableQueryResult` object.

If you save your progress and go back to the browser, you should see a nicely rendered grid of product cards.

 <div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-11-next-refine-pwa/final.png" alt="final" />
</div>

<br/>
<br/>

That’s it! We’ve successfully built a storefront using refine and Next.js SSR. Next, we’ll demonstrate how to generate a PWA manifest for our app, and how to turn it into a PWA.

---

<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />


---

## Generating PWA manifest

The first thing we need to do is to create a manifest for our application. This is a JSON file that contains metadata such as the name of the app or the start URL, which defines the look and behavior of our **PWA** when installed as an application. You should be familiar with the concept if you've built a chrome extension before.

Generating a manifest file manually is tedious. Fortunately for us, we can use several PWA manifest generators online to speed up the process. 

 Head over to [SimiCart manifest generator](https://www.simicart.com/manifest-generator.html/) or any site you trust and generate your manifest with the following example:

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-11-next-refine-pwa/manifest.png" alt="manifest" />
</div>

<br/>

As you can see, you're required to upload a logo image. The generator will use this image to output the various image sizes that are required for the manifest. In this case, we're using the refine logo.

After filling the form in the appropriate order, click on the "Generate manifest" button, and you'll be prompted to download a manifest zip file. 

:::note 
Make sure to download the file with a chrome browser. Firefox doesn't seem to download the file correctly.
:::

After downloading the file, extract it and rename the manifest file from the `.webmanifest` format to a `.json` format.

Before renaming
```
manifest.webmanifest
```

After renaming
```
manifest.json
```

Next, copy the manifest.json file and the generated icons to the public folder of your project.



Then, go to the pages folder and create a `_document.tsx` file. This file will let us override or update the contents within the `<html>` and `<body>` tags used to render a page. We will be using it to configure our PWA in the next section.

## Configuring PWA
First, open the `_document.tsx` file and add the following codes:

```tsx title="pages/_document.tsx"
import Document, { Html, Head, Main, NextScript } from "next/document";
 
class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon-192x192.png" />
          <meta name="theme-color" content="#042940" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
 
export default MyDocument;
```


Within the `<Head>` tag is three `<link>` tags that are linking the manifest file, icon, and theme setting to the head section of our application’s template. 

Now for the final step, open the `next.config.js` in your project and add the following code:


```tsx title="next.config.js"
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});
 
const nextConfig = withPWA({
  reactStrictMode: true,
});
 
module.exports = nextConfig;
```

That’s it! We’ve successfully made our storefront application into a PWA. To test it, run the build command below to create a local build of the application:

```
npm run build
```

Once the CLI is done with the build process, run the build locally by running the following command:

```
npm run start
```
<br/>

After starting the server, head over to your browser and visit http://localhost:3000. You should see a new icon beside the share icon, on the right side of the browser’s address bar.

<br/>

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-11-next-refine-pwa/pwa.png" alt="pwa" />
</div>

<br/>

This is the installation icon for our PWA app. Click on the icon to install the app and use it as a standalone application. 


## Conclusion
In this article, we demonstrated how to set up a Next.js refine project from scratch and how to fetch and render data from an external API using the refine's REST data provider. Then we looked at how to turn our application into a **PWA** using a JSON manifest.

The purpose of this tutorial is to give you a headstart with refine and its ecosystem. Visit documentations to learn more about refine and how to use it to build complex applications. 



## Project source code

https://github.com/refinedev/refine/tree/master/examples/blog/next-refine-pwa


<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="discord banner" />
</a>
</div>


---

<div className="banner-container">
<div className="banner-header" >Stop wasting your time copy/pasting your CRUD code all over your application!</div >



Meet the headless, React-based solution to build sleek **CRUD** applications. With refine, you can be confident that your codebase will always stay clean and boilerplate-free.

Try [refine](https://github.com/refinedev/refine) to rapidly build your next **CRUD** project, whether it's an admin panel, dashboard, internal tool or storefront.

    

<div>
<a href="https://github.com/refinedev/refine">
   <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/generic_banner.png" alt="refine blog logo" /> 
</a>
</div>

<br/>


**refine** is an open-source, React-based framework for building CRUD applications without constraints. It’s headless by design and seamlessly works with **any custom design** or **UI framework** you favor. For convenience, it ships with ready-made integrations for **Ant Design System, Material UI and Mantine UI**.

It can **speed up your development time up to 3X** without compromising freedom on styling, customization and project workflow.

Visit [refine GitHub repository](https://github.com/refinedev/refine) for more information, demos, tutorials, and example projects.

</div>
