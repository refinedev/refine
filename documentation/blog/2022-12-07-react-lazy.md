---
title: A Guide on React Lazy Loading
description: We will be looking at what lazy loading is, how it works, and how it can be used to improve the performance of React applications.
slug: react-lazy-loading
authors: chidume_nnamdi
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-12-07-react-lazy/social.png
hide_table_of_contents: false
---


## Introduction

Lazy Loading has been a concept in software development in general not just in web development. Lazy Loading can and used in desktop and mobile development. It is just another trick in making performance better in applications.
Lazy loading is a technique used to optimize the performance of a website or application. It's an approach that loads only the necessary resources when they're needed, instead of downloading everything at once. This way, users don't have to wait for all the resources to be downloaded before they can use the site or app.

Steps we'll cover:
- [What is lazy loading?](#what-is-lazy-loading)
- [What is React.lazy](#what-is-reactlazy)
- [Suspense](#suspense)
- [Catching Loading Errors](#catching-loading-errors)
- [Route-based code-splitting](#route-based-code-splitting)
- [Component-based code-splitting](#component-based-code-splitting)


## What is lazy loading?


The idea behind lazy loading is that it reduces the initial page load time, resulting in faster page loading and a better user experience. It's particularly useful for websites or applications that contain a lot of content, as it ensures that only essential resources are loaded initially.

Let's use a blog website as an example to describe how lazy loading will be effective in upping the performance of the website.

The blog website has a home page, a list page, and a detail page. The home page is the main page of the website, which is the first page that users see when they enter the website. The list page is the page that displays the list of blog articles. The detail page is the page that displays the content of the blog article.
If the home page loads the list and detail pages are also loaded with it, we will see that this will increase the page load time of the home page.

home page - 39KB 
list page - 90KB 
detail page - 88KB

We will see that a total of 217KB of the file will be loaded just for loading the home page. We can mitigate against this by breaking the bundle up and loading them at will. When the home page is loaded, only the home page is loaded. This will speed up the page load time because we are now loading only 39KB instead of the whole 217 KB.
So in a nutshell, this is how lazy loading is used in web development to speed up the performance of a webpage.

Also, not only pages are lazily loaded, but other UI elements of a page are also lazily loaded. For example, lists and images are lazily loaded until they are needed. The question is, when are they needed?

Let's answer that: let's say in our detail page that we have hundreds of images and these images will require another fetch from the server, so imagine sending hundreds of requests to fetch images in a single detail page, we will surely notice a drop in performance in our browser. What we will do is defer the loading of the images and load them once they are about to be scrolled into the viewport of the browser.

So we see that we can lazy load UI elements in a webpage and also other pages on our website. Lazy loading is an attempt to lower the page load time and the response times of our web pages to drive customer retention. Humans are impatient and if your webpage takes more than 2 secs to load, 95% of your users are most likely not patient enough to wait. So we will strive to use lazy loading to load the important part first and fast!

## What is React.lazy

`React.lazy()` is a powerful tool for optimizing the performance of React applications. It allows developers to import components dynamically, which can significantly reduce the size of the initial bundle and improve the overall performance of the application. In this article, we'll take a look at what `React.lazy()` is, how it works, and how it can be used to improve the performance of React applications.

React.lazy is a new feature introduced in React 16.6 that allows developers to implement lazy loading easily. It enables developers to split their code into small chunks, which can then be loaded on demand. This helps improve the performance of applications by reducing the amount of code that needs to be downloaded initially.

So, `lazy()` is a function in the React bundle. We can import it like this:

```tsx
import { lazy } from "react";
```
// OR

```
import React from "react";
React.lazy;
```

`React.lazy` utilizes dynamic import, which is a new feature of ES6 (ECMAScript 6). Dynamic import allows developers to dynamically import a module or component at runtime.

```tsx
import { capitalizeFirstLetter } from "./utils";
```

We want to lazy load the "utils" file and to be loaded when we want to use the `capitalizeFirstLetter` function. We use the `import` dynamic function:

```tsx
import("./utils").then((utils) => {
  console.log(utils.capitalizeFirstLetter("nnamdi chidume"));
});
```

This will spill out the `utils` file from the final bundle and load it on demand.
Coming to use `React.lazy`, we will first have to import the component we want to lazy load:

```tsx
import LazyComponent from "./LazyComponent";
```

Then, we call `React.lazy` passing a callback function to it. Then this callback function will call the `import` function in its body and return it. Then the path of the component will be passed to the `import` function call.

```tsx
const LazyComponent = React.lazy(() => import("./LazyComponent"));
```

The `LazyComponent` will be split from the main bundle into its bundle. It will not load with the main bundle during the page's initial load. It will be loaded when the `LazyComponent` is to be used.

For example, on our blog website, we have the pages: home, list, and detail. On the home page, we have links in each blog article to the detail page.

Our home page will be like this:

```tsx
import DetailPage from "./DetailPage";

const DetailPage = React.lazy(() => import("./DetailPage"));

export const HomePage = () => {
    return (
      <ul>
         {this.props.blogs.map((blog, index) => {
           return <DetailPage blog={blog} />;
         })}
      </ul>
      );
    };
```

Now, the DetailPage component will be broken out into a separate bundle and will not be loaded in the initial load time of the HomePage.
When we run this code we will get an error: `React component suspended while rendering, but no fallback UI was specified.`
This is because a lazily loaded component with `React.lazy` must be wrapped inside `Suspense` component.

What is Suspense?

---


<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />



---


## Suspense

`Suspense` is a React feature that allows for components to be loaded asynchronously. It is used in conjunction with `React.lazy`. Suspense is also used to display a loading indicator while the component is being fetched, or it can be used to render a fallback component if the component fails to load.
To use the Suspense component, we import it from the "react" package.

```tsx
import { Suspense } from "react";
```
Next, we wrap a `React.lazy` loaded component inside it:

```tsx
<Suspense>
    <LazyComponent />
</Suspense>
```

This will render the LazyComponent.

This is bad UX practice because the user will not know that a component will load. So we need to show the UX that something is coming, we will display a UI element to indicate to the user that a UI view will be loaded.

To do that in Suspense, we will use the `fallback` prop. Suspense uses the `fallback` prop to display a UI on the page while the lazily loaded component is still being loaded.

Let's add `fallback` to the above code, to display "Loading" before the LazyComponent is downloaded completely and rendered:

```tsx
<Suspense fallback={"Loading..."}>
  <LazyComponent />
</Suspense>
```

The `fallback` can take a JSX element:

```tsx
<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>

```
## Catching Loading Errors

When using `React.lazy`, it is important to catch any loading errors that might occur(for example, if a network error occurs).
We will wrap the Suspense component that contains our lazy-loaded components in an ErrorBoundary component. ErrorBoundary in React is like a try-catch block in JavaScript. It catches an error in a component tree without causing the errors to break the whole application.

A simple ErrorBoundary component is this:

```tsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logService(error, errorInfo);
  }

  render() {
    return this.state.hasError ? (
      <h1>Something went wrong.</h1>
    ) : (
      this.props.children
    );
  }
}
```

If there is an error in the component tree it is wrapped in, that component will not break the app rather it will render `Something went wrong.` in its place. This will allow you to catch any errors that occur with the loading of the component and handle them appropriately.
Now, we use this error boundary like this:

```tsx
<ErrorBoundary>
  <Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
  </Suspense>
</ErrorBoundary>;
```

## Route-based code-splitting

Much of what we have seen here is code-splitting components used for UI sections in the application. We don't however have to lazy load all the components in our application. Doing that might lead to serious issues.

Finding and knowing when and which component to lazy load is quite tricky. But the thing we know for sure is that we have to lazy load Route-based components.
Route-based components are components that are loaded when a specified URL is navigated to our application. They are the route pages setup using react-router in our application:

```tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import About from "./About";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
    </Routes>
  </Router>
);
```

We have two routes here: `/` and `/about`. They each load the `Home` and `About` pages respectively. The `Home` and `About` components are route-based components.
Now, these components are ideal components that are to be lazy loaded. IT will drastically reduce the overall bundle size of the application and decrease the load time of the page.

```tsx
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("./Home"));
const About = React.lazy(() => import("./About"));

const App = () => (
  <Router>
    <Suspense>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Suspense>
  </Router>
);
```

Now, `Home` and `About` will be broken off into their separate bundles. These bundles will be loaded when any of the page routes attached to the component is loaded.

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="discord banner" />
</a>
</div>



## Component-based code-splitting

We have two types of components in React. There are Route-based components and Component-based components. We have learned about Route-based components in the above section.

Component-based components are components that are not attached to the application's page route. They are normal components in the application used to display UI sections in the app. Most of the examples we touched on here are examples of Component-based code-splitting. Examples of components that are ideal to be code-split are Modals and Asides. This is because they are loaded eagerly on the load of the webpage.
Headers, dropdowns, and buttons are not to be lazily loaded because they are easily needed and are one of the most used UI elements in a webpage.

## Conclusion

We started by learning the definition of lazy loading, what it means and what good it brings to web development and software development at large. In the next sections, we learned about React.lazy function and how to use it. Next, we learned examples of how to lazily load Route-based and Component-based components in our React application.

`React.lazy` is a powerful feature of React that allows components to be loaded lazily from the server. It is a way to make components available only when they are needed, thus improving the performance of an application.


