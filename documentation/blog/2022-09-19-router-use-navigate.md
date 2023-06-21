---
title: Redirect in React Router V6 with useNavigate hook
description: We'll discover how to perform a redirect using useNavigate in React Router V6
slug: usenavigate-react-router-redirect
authors: joseph_mawa
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-19-router-use-navigate/social.jpg
hide_table_of_contents: false
---


## Introduction

React Router is a popular routing library for React. The latest version, React router version 6, shipped with several new features and improved compatibility with the latest version of React. Since hooks have become the preferred way of writing React code, React Router version 6 also heavily uses React hooks.

One such hook is the `useNavigate` hook. The `useNavigate` hook lets you navigate programmatically within your React code. In this article, you will learn the `useNavigate` hook and how to use it. We will also hint at when you might choose the `useNavigate` hook over the `Navigate` component.

Steps we'll cover:
- [How to set up React Router V6](#how-to-set-up-react-router-v6)
- [How to use the useNavigate hook](#how-to-use-the-usenavigate-hook)

## Prerequisites

To run the examples in this article, be sure to have some or all of the following.

- The Node runtime environment. Install Node for your operating system from the [Node downloads page](https://nodejs.org/en/download/).
- A working React project. Quickly create a React project using [superplate](https://github.com/pankod/superplate).

## How to set up React Router V6

If you have set up a React project, follow the steps below to start using React router. We will use React router version 6 throughout this article. This article assumes you are running React in the browser.

### Install React router

Install React router from the NPM package registry before using it. You can install it like so:

```sh
# Using NPM
 npm install react-router-dom@6

# Using Yarn
yarn add react-router-dom@6

# Using pnpm
pnpm add react-router-dom@6
```

### Configure React router

Configure your app to start using React Router by importing the router and wrapping your root component in it. Since our goal is to run React router in the browser, we will use the top-level Component `BrowserRouter`. It is the recommended interface for running React router in the browser. Several other routers, like `NativeRouter` and `StaticRouter`, have their use cases. Check the React router documentation to learn more about the other routers and their use cases.

According to the [documentation](https://reactrouter.com/en/main), `BrowserRouter` uses the HTML 5 history API internally to keep your application's UI in sync with the URL. The code below shows how to wrap the root component in `BrowserRouter` when working with React version 18.

You can copy and paste the code below into the `index.js` file.

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



### Configure routes

After installing and connecting your application like in the previous steps, configure the routes to start using React router. Since we are using React router version 6, we will import the `Routes` and `Route` components.  
After that, you can set up the routes like in the example below.

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

That is just about everything you need to do to start using React router version 6.

---


<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />



---
## How to use the `useNavigate` hook

As mentioned above, the **`useNavigate`** hook became part of React router in version 6. It is useful when navigating programmatically in your React project. The **`useNavigate`** hook returns an imperative method that you can use for changing location.

You can use the function returned by the `useNavigate` hook in two ways.

- Pass the path you want to navigate as the first argument and an optional object as the second argument.
- Pass the delta in the history stack to which you want to navigate as the only argument.

### Path with optional second argument

If you choose to pass the path you want to navigate and the second optional argument, then you can do it like so:

```tsx
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const submitHandler = async (event) => {
  event.preventDefault();

  try {
    await submitForm();
    navigate("/success"); // Omit optional second argument
  } catch (error) {
    navigate("/error", { state: { message: "Failed to submit form" } }); // Pass optional second argument
  }
};
```

In the example above, we navigate inside an event handler after submitting a form. Where we navigate depends on whether the form submission was successful or not.

The optional second argument looks like the object below. You can pass data as the value of the `state` property. If you set the value of `replace` to `true`, React router will replace the current entry in the history stack instead of adding a new one. Both `state` and `replace` fields are optional.

```tsx
{
  state: { message: "Failed to submit form" },
  replace: false,
}
```

After navigation, the data you passed using `navigate` is accessible inside the matching route's rendered component using the `useLocation` hook.

```tsx
const location = useLocation();
console.log(location.state) 
// { message: 'Failed to submit form' }
```

### Modifying the history stack

If you choose to modify the history stack, you need to pass the delta in the history stack to which you want to go. For example, `navigate(-1)` is equivalent to clicking the browser's back button.

Be aware that `useNavigate` is a hook. Therefore you cannot directly use it with ES6 classes. Use the `Navigate` component instead. The `Navigate` component uses `useNavigate` internally, and the two are functionally similar.

Similarly, while using the **`useNavigate`** hook, you should remember the rules of React hooks. Do not invoke React hooks inside loops, conditions, or nested functions. Invoke them at the top level.

## Conclusion

The `useNavigate` hook shipped with React Router version 6. It comes in handy if you want an imperative API for navigation and returns a function you can invoke in two ways. When invoking the function returned, you either pass the path you want to navigate to as the first argument and an optional object as the second argument or the delta you want to navigate in the history stack.

The **`useNavigate`** hook is functionally similar to the `Navigate` component. Since you can't directly use hooks with ES6 classes, the `Navigate` component comes in handy when working with class-based components.



<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord-banner.png" alt="discord banner" />
</a>
</div>

