---
title: Redirect in React Router V6 with Navigate Component
description: We'll see how to redirect using Navigate Component in React Router V6
slug: navigate-react-router-redirect
authors: joseph_mawa
tags: [react]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-09-29-router-navigate-component/social.png
hide_table_of_contents: false
---


## Introduction

React Router version 6 shipped recently with several new features and improvements. One such feature is the `Navigate` component. It is the component equivalent of the `useNavigate` hook.

This article will take a deep dive into the `Navigate` component.

Steps we'll cover:
- [Getting started with React router](#getting-started-with-react-router)
- [Installing React router](#installing-react-router)
- [Setting up React router](#setting-up-react-router)
- [Setting up routes](#setting-up-routes)
- [How to use the  `Navigate` component](#how-to-use-the--navigate-component)

## Prerequisites

To run the examples in this article, you need to have some following.

- A working React project. Quickly create a React project using [superplate](https://github.com/pankod/superplate).

## Getting started with React router

In this section, you will learn how to set up React router in an existing React project.
## Installing React router

Depending on your package manager, install React router from the NPM package registry using one of the commands below.

```sh
# Using NPM
 npm install react-router-dom@6

# Using Yarn
yarn add react-router-dom@6

# Using pnpm
pnpm add react-router-dom@6
```

## Setting up React router

Before using React router in the browser environment, import one of the top-level Components and wrap your root Component in it. We will use `BrowserRouter` since we want to run React router in the browser. It is the recommended way for running React router in the browser.

If you are using React router version 6, wrap your root component in `BrowserRouter` as in the example below.

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

##  Setting up routes

In React router version 6, you can use the `Routes` and `Route` Components to set up the routes in your application. You can import and use them like so:

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

## How to use the  `Navigate` component

The `Navigate` component is one of the several built-in components in React router version 6. It is a wrapper for the `useNavigate` hook, and the current location changes when you render it.

```tsx
import { Navigate } from "react-router-dom";
```

Import `Navigate` from `react-router-dom` to start using it. The `Navigate` component takes up to three `props`, only one of which is required. The other two are optional. 

Below are the explanations for these three `props`.

```tsx
<Navigate to="/dashboard" state={{ todos: []}} replace={true} />
```

- `to` - A required prop. Its value should be the path which you want to navigate.
- `replace` - An optional boolean prop. Setting its value to `true` will replace the current entry in the history stack.
- `state` - An optional prop. You can use it to pass data from the component that renders `Navigate`.

The code below illustrates how you can use the `Navigate` component for navigation. We are rendering it conditionally after a state update and using the `state` prop to pass a route state.

```tsx
const App = () => {
  const [loginDetails, setLoginDetails] = useState({ email: "", password: "" });
  const [user, setUser] = useState(null);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setLoginDetails((loginDetails) => ({ ...loginDetails, [name]: value }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const user = await loginUser(loginDetails);
    setUser(user);
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={loginDetails.email}
            onChange={changeHandler}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={loginDetails.password}
            onChange={changeHandler}
            required
          />
        </label>
        <button type="submit"> Login </button>
      </form>
      {user && <Navigate to="/dashboard" state={user} replace={true} />}
    </div>
  );
};
```

After navigation, the component rendered by the matching route can access the state prop passed to `Navigate` using the `useLocation` hook like so:

```tsx
const location = useLocation();
console.log(location.state);
// The default value of location.state is null if you don't pass any data.
```

The `props` you pass to the `Navigate` component are the same as the arguments required by the function returned by the `useNavigate` hook.

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="discord banner" />
</a>
</div>

## Conclusion

`Navigate` component is one of the built-in components that shipped with React router version 6. It is a React component equivalent of the `useNavigate` hook. It uses `useNavigate` internally. The props you pass to `Navigate` are the same as the arguments you pass to the function returned by `useNavigate`.

Unlike functional components in React, ES6 classes do not support hooks. Therefore,  `Navigate` is a handy equivalent of  `useNavigate` when working with class-based React components.  
