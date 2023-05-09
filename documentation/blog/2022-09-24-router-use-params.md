---
title: How to use the useParams hook in React Router
description: We'll discover how to access the parameters of the current route with the useParams hook in React Router.
slug: react-router-useparams
authors: joseph_mawa
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-24-router-use-params/social.jpg
hide_table_of_contents: false
---




## Introduction

The `useParams` hook is one of the several hooks in React router. It has been available in React router since version 5. You can use it to retrieve route parameters from the component rendered by the matching route. You will explore the React Router `useParams` hook and how to use it in this article.

Steps we'll cover:
- [Introduction](#introduction)  
- [Setting up React Router](#setting-up-react-router)
- [What are URL parameters in React Router?](#what-are-url-parameters-in-react-router)
- [How to use the  `useParams` hook](#how-to-use-the-useparams-hook)


## Prerequisites

To try out the examples in this article, you need to have a React project.

Quickly create a React project using [superplate](https://github.com/pankod/superplate) CLI.

``` 
npx superplate-cli useparams-example-app
```

## Setting up React Router

The steps below explain how to set up React router version 6 in an existing React project.

### Step 1 - Install React Router

Use one of the commands below to install React router version 6.

```sh
# Using NPM
npm install react-router-dom@6

# Using Yarn
yarn add react-router-dom@6

# Using pnpm
pnpm add react-router-dom@6
````

### Step 2 - How to set up React router

To use React router in the browser environment, import `BrowserRouter` and wrap your root component as in the example below. `BrowserRouter` is a top-level Component. Other routers, such as `NativeRouter` and `StaticRouter`, have their use cases you can look up in the documentation.

```tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
```

### Step 3 - How to set up routes

Unlike in earlier versions of React router, you import the `Routes` and `Route` components in React router version 6 and then set them up like in the example below.

```tsx
import { Route, Routes } from "react-router-dom";
import { Home, Blog } from "./components"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </div>
  );
}
```

---


<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />



---

## What are URL parameters in React router

When declaring functions in JavaScript, we use placeholders referred to as parameters. You use the parameters to perform some operations in the function declaration and return a value. The code below is a JavaScript function declaration that takes two numbers and returns their sum.

```tsx
function add(a, b){
  return a + b;
};
```

In the function declaration above, `a` and `b` are placeholders. They are function parameters. The actual values you pass during function invocation are arguments. In the function invocation below, `2` and `3` are arguments. The function can take any pair of numbers as arguments and return their sum.

```tsx
const sum = add(2, 3);
console.log(sum) // 5
```

The concept of parameters is not limited to function declarations. When working with React router, there are URL parameters similar to the function parameters described above. In React router, URL parameters are placeholders you declare in a route, as in the example below.

```tsx
<Routes>
  <Route path="/blog/:id" element={<Blog />} /> 
</Routes>
```

In the example above, `id` is a placeholder because of the `:` in front. The placeholder is known as the URL parameter. Because of the URL parameter, React router will not literally match the route above with the URL. It will dynamically match if you point the browser to a URL that matches the `/blog/:id` pattern in its path.

Assuming you are hosting the site on `https://refine.dev/`, pointing the browser to `https://refine.dev/blog/use-params` will match the route above. As a result, the `id` parameter will take the value `"use-params"` in the `Blog` component. 

The section below will explain how you can access the URL parameter in the rendered Component using the `useParams` hook.

## How to use the  `useParams` hook

As explained in the section above, you can declare a route with URL parameters so that React router dynamically captures the corresponding values in the URL when there is a match. It is useful when dynamically rendering the same component for multiple paths.

```tsx
<Routes>
  <Route path="/blog/:id" element={<Blog />} /> 
</Routes>
```

Assuming you have the route above in your React router setup, you can retrieve the route parameters in the `Blog` component using the `useParams` hook. It returns an object. The object keys are the parameter names declared in the path string in the Route definition, and the values are the corresponding URL segment from the matching URL.

You can use the `useParams` hook in the rendered component to retrieve the parameters like so:

```tsx
import { useParams } from "react-router-dom";

const Blog = () => {
  const routeParams = useParams();
};
```

If the matching route is`/blog/use-params` for the example above, the `useParams` hook will return the object below. You can then use the returned object in the rendered Component the way you want.

```tsx
{
  id: "use-params"
}
```

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="discord banner" />
</a>
</div>

## Conclusion

The `useParams` hook has been part of React router since version 5. It comes in handy if you want to retrieve route parameters from the functional component rendered by the matching route. The React Router `useParams` hook returns an object whose keys are the parameter names declared in the path string in the Route definition, and the values are the corresponding URL segment from the matching URL.
