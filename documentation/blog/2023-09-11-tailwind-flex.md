---
title: Tailwind Flex for Responsive React Components
description: This post is about how to use TailwindCSS Flex classes effectively to implement responsive components in React.
slug: tailwind-flex
authors: abdullah_numan
tags: [tailwind, css]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-11-tailwind-flex/social.png
hide_table_of_contents: false
---

## Introduction

[TailwindCSS](https://tailwindcss.com/) is a robust CSS framework that provides numerous utility classes for layout, sizing, colors, typography, etc. One of the most powerful capabilities Tailwind provides is responsive variants of utility classes for all screen sizes. Tailwind also supports variants for an element's states like `hover`, `focus`, `active`, and so on.

CSS Flexbox is supported by TailwindCSS with Flex classes that are initiated with `flex` and further styled with intuitive and easy to remember placement classes like `justify-start`, `justify-center`, `items-start`, `items-center`, and the like. Layout direction is manipulated using classes named `flex-col` and `flex-row`.

In this post, we will play with Tailwind Flex classes to build a simple React navbar that initially has its menu vertically stacked in screens smaller than `md`, and hoists it horizontally to the top at larger screens. Since we are using Tailwind to move the nav menu up, with Flex rows **_it is just Tailzup!_**

We'll employ a mobile-first approach, so we'll be starting with using `flex-direction: "column"` with `flex-col` class and then at `md` apply `flex-direction: "row"` with `flex-row`. We'll use Flex order modifiers such as `order-last` to change the order of navbar items. We'll also be growing items using `flex-{n}` classes.

We'll start with a collapsible React navbar that already comes in a collapsed state with the necessary spacing and sizing implemented so that we can focus on the use of Tailwind Flex classes in this article.

Before starting, though, let's talk about the prerequisites that need to be managed for getting hands-on with Tailwind Flex.

Steps we'll cover:

- [Starter Files](#starter-files)
  - [`<Navbar />` Component](#navbar--component)
- [Styling a Navbar with TailwindCSS classes](#styling-a-navbar-with-tailwindcss-classes)
  - [Nav Items with Tailwind Flex](#nav-items-with-tailwind-flex)
  - [Ordering List Items with Tailwind Flex](#ordering-list-items-with-tailwind-flex)
  - [Search Bar](#search-bar)
  - [Positioning Navbar Logo with Tailwind Flex](#positioning-navbar-logo-with-tailwind-flex)

## Prerequisites

You must first have [**Node.js**](https://nodejs.org/en) to initialize a React App. You can get it from [here](https://nodejs.org/en/download).

Follow these steps to start a React App with TailwindCSS:

1. From your terminal, go to a folder of your choice. Create a React App with CRA and open it in your code editor:

```bash
npx create-react-app flex-navbar
code flex-navbar
```

2. Install TailwindCSS and initialize the `tailwind.config.js` file:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

3. Configure template paths:

```bash title="tailwind.config.js"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

4. Add Tailwind layers to your CSS file. For this project, I have moved mine to `src/styles/styles.css`:

```css title="src/styles/styles.css"
/* CSS reset or normalizer code */

@tailwind base;
@tailwind components;
@tailwind utilities;

/* TailwindCSS styles */
```

It is important that the Tailwind directives are added towards the top of your CSS file before any other TailwindCSS classes are used.

5. Run the compile script for TailwindCSS, with the `--watch` flag:

```bash
npx tailwindcss -i ./src/styles/styles.css -o ./public/styles/styles.css --watch
```

With this, TailwindCSS will compile styles in `./src/styles/styles.css` and put it in the `./public/styles/styles.css` folder. It is important that it keeps running in order to instantly compile newly added classes.

6. Link the CSS file to `./public/index.html` file:

```html
<link href="./styles/styles.css" rel="stylesheet" />
```

If you run into any hurdle, please check out how to initialize a React app with `create-react-app` (CRA) for TailwindCSS from [here](https://tailwindcss.com/docs/guides/create-react-app).

With the development environment set up, let's now get our starter files prepared.

## Starter Files

To begin working, our `App.tsx` file should look like this:

```tsx
import React from "react";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <main>{/*Lorem stuff here*/}</main>
    </div>
  );
}

export default App;
```

Please feel free to clean up all other imports and markups.

We want to focus on the `<Navbar />` component.

### `<Navbar />` Component

The `<Navbar />` component initially looks like this:

<details>

<summary>Show Navbar styles</summary>

```tsx title="src/components/Navbar.jsx"
import React, { useState } from "react";
import { Avatar, HamburgerIcon, SearchIcon, TailzupLogo } from "./../icons";
import TailzupLogo from "../images/tailzup-logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuHidden = !isMobileMenuOpen ? "hidden md:block" : "";
  return (
    <nav className="navbar">
      <div id="brand-wrapper" className="nav-wrapper">
        <a className="brand" href="/">
          <img src={TailzupLogo} width={180} height={62} alt="tailzup-logo" />
        </a>
      </div>
      <div
        className={`${menuHidden} border-t border-slate-500 md:border-none text-amber-50 transition-all ease-in-out duration-1000`}
      >
        <div id="items" className="my-2">
          <div className="left mx-2 p-2">
            <input className="text-input" type="email" placeholder="Find donald trump or something..." />
            <SearchIcon />
          </div>
          <div>
            <ul id="right" className="">
              <li className="nav-item">
                <a href="/">
                  <Avatar />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Friends
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Messages
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <HamburgerIcon isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
    </nav>
  );
};

export default Navbar;
```

</details>

If you examine, you can see that the display and hiding logic of the vertical menu is already implemented using `isMobileMenuOpen` state. We also have all the spacing, typography and color styles completed with `navbar`, `nav-wrapper`, `brand`, and `text-input` classes composed from necessary TailwindCSS utility classes. You can see what's going on in `src/styles/styles.css` file for the details.

### Images

We are using the following imported image for our logo:

```tsx
import TailzupLogo from "../images/tailzup-logo.png";
```

You can download it from [here](https://imgbox.com/eCnG8yLw) and add it to the specified directory.

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-11-tailwind-flex/images.png"  alt="tailwind flex" />
</div>

<br/>

### Styles

The CSS file we are using looks like the one below. Please copy over all the styles and place them inside `src/styles/styles.css`:

<details>

<summary>Show CSS styles</summary>

```css title="src/styles/styles.css"
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --primary-color: rgb(223, 232, 247);
  --secondary-color: rgb(182, 76, 27);
  --grayscale: rgb(226, 218, 218);
  --friendly: green;
  --neutral: blue;
  --warning: yellow;
  --danger: crimson;
  --forbidden: black;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  min-width: 450px;
}

.navbar {
  @apply fixed mx-auto px-2 w-full h-auto bg-slate-600;
}

.nav-wrapper {
  @apply h-14 bg-slate-600 w-full;
}

.brand {
  max-width: 12rem;
  color: var(--primary-color);
  @apply block text-4xl mx-2 py-2;
}

.nav-item {
  @apply mx-2 p-1 rounded lg:mx-8 w-full lg:w-auto hover:scale-105 hover:backdrop-brightness-125 hover:shadow transition-all;
}

.nav-link {
  @apply text-center p-1;
}

.text-input {
  @apply py-0.5 px-2 border rounded-l text-slate-800;
}

.avatar {
  width: 2rem;
  height: 2rem;
  color: whitesmoke;
}

.tailzup-logo {
  width: 4rem;
  height: 4rem;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
  color: whitesmoke;
}
```

</details>

### Icons

We have some icons in `src/components/icons` folder. They are mainly the JSX markup of Heroicons. Please copy them over and import them as necessary.

<details>

<summary>Show Icons</summary>

```tsx title="src/components/icons/index.tsx"
import React from "react";

export const HamburgerIcon = ({ isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <div
      className={`absolute top-3 right-4 p-1 border border-slate-500 rounded md:hidden text-slate-500 hover:text-slate-300 hover:bg-slate-500`}
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
    >
      <a href="/">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      </a>
    </div>
  );
};

export const Avatar = () => {
  return (
    <a href="/">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="avatar"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
        />
      </svg>
    </a>
  );
};

export const SearchIcon = () => {
  return (
    <button
      className="px-2 py-0.5 border rounded-r hover:rounded-r hover:border-slate-400 hover:bg-slate-500 transition ease-in-out duration-50"
      href="/"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="icon"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
        />
      </svg>
    </button>
  );
};
```

</details>

The icons also come with necessary TailwindCSS styles. You can copy and paste them directly and use them in your navbar if you feel the need to.

Alright, with everything now set on the stage, let's try running the app:

```
npm run start
```

You can see a vertical menu and a toggle button at a screen size less than `md`. And the toggle button is functioning properly:

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-11-tailwind-flex/icons-min.gif"  alt="tailwind flex" />
</div>

<br/>

The menu items in `<Navbar />` are not yet following flex formatting, as all the div's and the unordered list are forming Block Formatting Contexts. This is because the `<Navbar />` component does not have any flex styling yet.

So, let's start flexing the navbar with TailwindCSS Flex classes.

## Styling a Navbar with TailwindCSS classes

We'll go inside out, as it is easier to manage inner flex containers and then combine container siblings up the HTML tree.

### Nav Items with Tailwind Flex

We'll apply a mobile-first approach to the `<ul>` list and its items. They make up the main navigation links. And we want to start with flex columns on smaller screens and then go horizontal at `md`. While in column layout, we want the items to be justified and aligned to the top-left. This is achieved as default without any flex placing classes:

```html
<div>
  <ul
    id= "right"
                //highlight-start
    className="flex flex-col md:flex-row md:justify-start md:items-center"
                //highlight-end
  >
        //highlight-next-line
    <li className= "nav-item md:order-last" >
      <a href="/">
        <Avatar />
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/">
        Home
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/">
        Friends
      </a>
    </li>
    <li className="nav-item">
      <a className="nav-link" href="/">
        Messages
      </a>
    </li>
  </ul>
</div>
```

At `md`, with `md:flex-row md:justify-start md:items-center`, we are turning the items horizontally, justified to the start, and vertically positioned to the center.

### Ordering List Items with Tailwind Flex

Notice, the `<Avatar />` item's `<li>` element is the first item on smaller screens, and we moved its order to last with `md:order-last`. On screens larger than `md` it's showing at the end of the horizontal navbar.

### Search Bar

Next, we look at the sibling of the container of the list we just "flexed" - the parent that houses the search bar. We first want the search bar input and icon to be flexed together, centered horizontally and vertically at all times. So:

```tsx
<div
  //highlight-start
  className="left mx-2 p-2 flex justify-center items-center"
  //highlight-end
>
  <input className="text-input" type="email" placeholder="Find danielle trump or sth..." />
  <SearchIcon />
</div>
```

Then, we want to correctly position the search bar and the nav list items. We want the search bar and list items stacked vertically from top-left on smaller screens, i.e., while in `flex-col` direction. And on screens larger than `md`, we want them to go horizontal, positioned justified from the start, and vertically centered. So, on the parent container with `id=" items"`:

```tsx
<div
  id="items"
  //highlight-start
  className="my-2 flex flex-col justify-start items-start md:flex-row md:justify-start md:items-center"
  //highlight-end
>
  <div
    //highlight-start
    className="left mx-2 p-2 order-last md:order-none flex justify-center items-center"
    //highlight-end
  >
    <input className="text-input" type="email" placeholder="Find danield trump or st..." />
    <SearchIcon />
  </div>
  <div>
    <ul id="right" className="flex flex-col md:flex-row md:justify-start md:items-center">
      <li className="nav-item md:order-last">
        <a href="/">
          <Avatar />
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/">
          Home
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/">
          Friends
        </a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/">
          Messages
        </a>
      </li>
    </ul>
  </div>
</div>
```

Notice we are applying flex order again with Tailwind Flex `order` classes. With `order-last md:order-none` on the search bar container, we are placing it at the bottom of the vertical stack on smaller screens, and by removing it on `md` and up, we are moving it back to the first position.

So, with these changes, we have been able to achieve a good shape for the vertical navbar. The navbar looks almost complete, and it can now strongly flex its muscles back and forth in the horizontal position:

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-11-tailwind-flex/vertical-menu-min.gif"  alt="tailwind flex" />
</div>

<br/>

We need to now fix things with the brand item, which should be on the left of the other items on larger screens.

### Positioning Navbar Logo with Tailwind Flex

Before we work on the parent `<nav>`, let's make sure all elements inside the `id= "brand-wrapper"` are always centered horizontally and vertically.

```html
<div
  id= "brand-wrapper"
  //highlight-start
  className="nav-wrapper flex justify-start items-center flex-1 self-start"
  //highlight-end
>
  <a className="brand" href="/">
    <img src={TailzupLogo} width={180} height={62} alt="tailzup-logo" />
  </a>
</div>
```

Notice the `flex-1` class. It is related to the `flex` of the `nav` element. We are making the `brand-wrapper` `div` grow to empty spaces all the time.

And now, in the parent `nav` element, for screens larger than `md`, let's make the navbar items on the right become horizontal with the brand item on the left:

<details>

<summary>Show code</summary>

```tsx
<nav
  //highlight-start
  className="navbar flex flex-col justify-start md:flex-row md:justify-between md:items-center"
  //highlight-end
>
  <div className="nav-wrapper flex justify-start items-center flex-1 self-start">
    <a className="brand" href="/">
      <img src={TailzupLogo} width={180} height={62} alt="tailzup-logo" />
    </a>
  </div>
  <div
    className={`${menuHidden} border-t border-slate-500 md:border-none text-amber-50 transition-all ease-in-out duration-1000`}
  >
    <div
      id="items"
      className="my-2 flex flex-col justify-start items-start md:flex-row md:justify-start md:items-center"
    >
      <div className="left mx-2 p-2 order-last md:order-none flex justify-center items-center">
        <input className="text-input" type="email" placeholder="Find danielle trump or stormy..." />
        <SearchIcon />
      </div>
      <div>
        <ul id="right" className="flex flex-col md:flex-row md:justify-start md:items-center">
          <li className="nav-item md:order-last">
            <a href="/">
              <Avatar />
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Home
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Friends
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Messages
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <HamburgerIcon isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
</nav>
```

</details>

With `flex flex-col justify-start md:flex-row md:justify-between md:items-start` on `nav` element, we are placing the brand items stacked on top of other items on smaller screens, and then `md` and up, they are horizontally spaced between and centered vertically.

So, with this Tailwind Flex power, we have a pretty neat React responsive navbar we can use on any webpage:

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-11-tailwind-flex/ezgif.com-optimize-min.gif"  alt="tailwind flex" />
</div>

<br/>

And the final `<Navbar />` component looks like this:

<details>

<summary>Show Navbar</summary>

```tsx title="src/components/Navbar.tsx"
import React, { useState } from "react";
import { Avatar, HamburgerIcon, SearchIcon } from "./icons";
import TailzupLogo from "../images/tailzup-logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMenuHidden = !isMobileMenuOpen ? "hidden md:block" : "";

  return (
    <nav className=" navbar flex flex-col justify-start md:flex-row md:justify-between md:items-center">
      <div
        id="brand-wrapper"
        className="nav-wrapper flex flex-nowrap justify-start items-center flex-1 self-start
"
      >
        <a className="brand" href="/">
          <img src={TailzupLogo} width={180} height={62} alt="tailzup-logo" />
        </a>
      </div>
      <div
        className={`${isMenuHidden} border-t border-slate-500 md:border-none text-amber-50 transition-all ease-in-out duration-1000`}
      >
        <div
          id="items"
          className="my-2 flex flex-col justify-start items-start md:flex-row md:justify-start md:items-center"
        >
          <div className="left mx-2 p-2 order-last md:order-none flex justify-center items-center">
            <input className="text-input" type="email" placeholder="Find all trump or storm his estates..." />
            <SearchIcon />
          </div>
          <div>
            <ul id="right" className="flex flex-col md:flex-row md:justify-start md:items-center">
              <li className="nav-item md:order-last">
                <a href="/">
                  <Avatar />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Friends
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  Messages
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <HamburgerIcon isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
    </nav>
  );
};

export default Navbar;
```

</details>

## Summary

In this post, we used Tailwind Flex classes to build a collapsible, responsive React navbar. The navbar hides the menu on mobile screens and can be toggled via clicking on a double cheese hamburger button. It hoists up to a horizontal bar after `md`.

We started off with the layout and element sizes already styled with relevant Tailwind utilities and the mobile menu implemented. We then gradually applied intuitive Tailwind Flex classes to determine the flex directions for our target break points with `flex-col` and `flex-row`. We applied placement flex classes such as `justify-center`, `justify-start`, `items-center`, `items-start`, `self-start`, etc., to position flex items to intended places for each breakpoint. We also changed orders of a couple of flex items using `order-{n}` classes. We also used the `flex-{n}` class to grow our logo wrapper to available spaces.
