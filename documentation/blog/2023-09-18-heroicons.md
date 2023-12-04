---
title: Using Heroicons with TailwindCSS
description: In this post, we see how to use Heroicons with TailwindCSS.
slug: heroicons-with-tailwind
authors: abdullah_numan
tags: [tailwind, css]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-18-heroicons/social.png
hide_table_of_contents: false
---

## Introduction

[Heroicons](https://heroicons.com) are SVG-based icons packaged by the creators of TailwindCSS. They come in two size variants, `20`, which is suitable for small buttons and form elements, and a `24` size, that is useful for primary navigation buttons like call to action and hero sections. `24` size comes as `solid` and `outline`.

A Heroicon is a React component that returns an `<svg>` element with props passed to it. We are able to set values for the properties of the `<svg>` element, such as `className`, `stroke`, and `fill`, by passing them to the Heroicon component.

TailwindCSS `<svg>` classes such as `stroke-{color}-{saturation}` are very useful in styling regular `<svg>` elements. Heroicons take it one step forward by allowing the `className` prop to a Heroicon JSX element. This means we can pass TailwindCSS classes to a Heroicon component to style its `svg>` element. For example, we can set the `stroke` color of a Heroicon `<svg>` with TailwindCSS classes simply by adding `stroke-{color}-{saturation}` to the Heroicon component's `className`.

Besides, we can also pass regular properties such as `stroke`, `fill`, `width` and `height` of the `<svg>` to the Heroicon, which is assigned to the `<svg>` element.

In this post, we use Heroicons with both TailwindCSS and non-Tailwind classes. We'll work on an already built navbar that currently has Tailwind styled regular `<svg>` icons (they are the same `<svg>`'s produced from the Heroicons we'll be using). We'll be replacing them with Heroicon React components and styling them accordingly.

The existing navbar is available in [this repository](https://github.com/anewman15/navbar-hero). As using Heroicons is pretty easy, to grasp how the examples work, it is enough just to follow the JSX. If you want to run the app and see what's going on in the browser when the style changes, please follow the steps below to clone the repo and run it locally.

Steps we'll cover:

- [Install Heroicons](#install-heroicons)
- [A Navbar with Heroicons](#a-navbar-with-heroicons)
  - [Adding and Styling Heroicons with TailwindCSS](#adding-and-styling-heroicons-with-tailwindcss)
  - [Using Regular TailwindCSS Utilities with Heroicons](#using-regular-tailwindcss-utilities-with-heroicons)
  - [Using `SVG` Related TailwindCSS Utilities with Heroicons](#using-svg-related-tailwindcss-utilities-with-heroicons)
  - [Using non-TailwindCSS Classes with Heroicons](#using-non-tailwindcss-classes-with-heroicons)
  - [Applying Native `<svg>` Properties to Heroicons](#applying-native-svg-properties-to-heroicons)
  - [Applying Responsive TailwindCSS Utils to Heroicons](#applying-responsive-tailwindcss-utils-to-heroicons)

## Preparation

Clone the repository [here](https://github.com/refinedev/refine/tree/master/examples/blog-heroicons-example).

Then open it in your code editor and run:

```bash
npm install
npm run start
```

### Install Heroicons

```bash
npm install @heroicons/react
```

Then to compile newly added TailwindCSS classes, run the CSS compiler in `watch` mode:

```bash
npx tailwindcss -i ./src/styles/styles.css -o ./public/styles/styles.css --watch
```

## A Navbar with Heroicons

Currently, the `<Navbar />` component looks like this:

```tsx title="src/components/navbar/Navbar.tsx"
import React, { useState } from "react";
import TailzupLogo from "../icons/TailzupLogo";
import { Avatar } from "../icons/Avatar";
import { HamburgerIcon } from "../icons/HamburgerIcon";
import { SearchIcon } from "../icons/SearchIcon";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuHidden = !isMobileMenuOpen ? "hidden md:block" : "";
  return (
    <nav className="navbar">
      <div className="brand-wrapper">
        <a className="brand" href="/">
          <TailzupLogo color="orange" />
        </a>
      </div>
      <div
        className={`${menuHidden} border-t border-slate-500 md:border-none text-amber-50 transition-all ease-in-out duration-1000`}
      >
        <div id="items" className="items-strip">
          <div id="left" className="items-left">
            <input className="text-input" type="email" placeholder="Find Donald or something..." />
            <SearchIcon />
          </div>
          <div id="right">
            <ul className="items-list">
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
      <div
        className={`absolute top-3 right-4 p-1 border border-orange-400 rounded md:hidden text-slate-500 hover:text-slate-300 hover:bg-orange-200`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <a href="/">
          <HamburgerIcon />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
```

`<SearchIcon />`, `<Avatar />` and `<HanburgerIcon />` icons contain `<svg>` elements produced from Heroicons. They are available in this folder: `src/components/icons/`. However, we will be replacing them with actual Heroicon React components.

### Styles

All the classes used on the components are styled with regular Tailwind and CSS classes. You can find them in this stylesheet:

<details>

<summary>src/styles/styles.css</summary>

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
  @apply sticky top-0 mx-auto px-2 w-full h-auto bg-slate-600 flex flex-col justify-start md:flex-row md:justify-between md:items-center;
}

.brand-wrapper {
  @apply h-14 bg-slate-600 w-full flex justify-start items-center flex-1 self-start;
}

.brand {
  max-width: 12rem;
  color: var(--primary-color);
  @apply text-4xl p-2;
}

.items-strip {
  @apply my-2 flex flex-col justify-start items-start md:flex-row md:justify-start md:items-center;
}

.items-left {
  @apply mx-2 p-2 order-last md:order-none flex justify-center items-center;
}

.items-list {
  @apply flex flex-col md:flex-row md:justify-start md:items-center;
}

.nav-item {
  @apply mx-2 p-1 rounded lg:mx-8 w-full lg:w-auto hover:scale-105 hover:backdrop-brightness-125 hover:shadow transition-all;
}

.nav-link {
  @apply text-center p-1 flex justify-start items-center;
}

.text-input {
  @apply py-0.5 px-2 border rounded-l text-slate-800;
}

.avatar {
  width: 2rem;
  height: 2rem;
  color: whitesmoke;
}

.icon {
  width: 1.5rem;
  height: 1.5rem;
  color: whitesmoke;
}

.tailzup-logo {
  width: 4rem;
  height: 4rem;
}

.glow {
  animation: glow 0.8s alternate infinite;
}

@keyframes glow {
  0% {
    filter: drop-shadow(0 0 1px #fff) drop-shadow(0 0 2px #fff) drop-shadow(0 0 3px #ff80b3) drop-shadow(
        0 0 4px #ff4d94
      )
      drop-shadow(0 0 5px #ff0066);
  }
  29% {
    filter: drop-shadow(0 0 2px #fff) drop-shadow(0 0 4px #fff) drop-shadow(0 0 6px #ff80b3) drop-shadow(
        0 0 8px #ff4d94
      )
      drop-shadow(0 0 10px #ff0066);
  }

  92% {
    filter: drop-shadow(0 0 3px #fff) drop-shadow(0 0 6px #fff) drop-shadow(0 0 9px #ff80b3) drop-shadow(
        0 0 12px #ff4d94
      )
      drop-shadow(0 0 15px #ff0066);
  }
}
```

</details>

The navbar now looks like this:

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-18-heroicons/navbar-initial2.gif"  alt="tailwind flex" />
</div>

<br/>

### Adding and Styling Heroicons with TailwindCSS

We'll replace the existing icons with Heroicons components. So, let's import and replace:

```tsx title= "src/components/navbar/Navbar.tsx"
import React, { useState } from "react";
import TailzupLogo from "../icons/TailzupLogo";
//highlight-next-line
import { Bars4Icon, MagnifyingGlassIcon, UserIcon } from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuHidden = !isMobileMenuOpen ? "hidden md:block" : "";
  return (
    <nav className="navbar">
      <div className="brand-wrapper">
        <a className="brand" href="/">
          <TailzupLogo color="orange" />
        </a>
      </div>
      <div
        className={`${menuHidden} border-t border-slate-500 md:border-none text-amber-50 transition-all ease-in-out duration-1000`}
      >
        <div id="items" className="items-strip">
          <div id="left" className="items-left">
            <input className="text-input" type="email" placeholder="Find donald trump or something..." />
            {/*highlight-next-line*/}
            <MagnifyingGlassIcon className="h-6 w-6 mx-1 stroke-orange-400" />
          </div>
          <div id="right">
            <ul className="items-list">
              <li className="nav-item md:order-last">
                <a href="/">
                  {/*highlight-next-line*/}
                  <UserIcon className="h-8 w-8 glow" stroke="pink" strokeWidth={1.2} />
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
      <div
        className={`absolute top-3 right-4 p-1 border border-orange-400 rounded md:hidden text-slate-500 hover:text-slate-300 hover:bg-orange-200`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <a href="/">
          {/*highlight-next-line*/}
          <Bars4Icon className="h-6 w-6 stroke-orange-400" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
```

With the Heroicon Reract components, everything should remain unchanged.

Notice that we are passing CSS classes with the `className` prop to the following Heroicons components: `<MagnifyingGlassIcon />`, `<UserIcon />` and `<Bars4Icon />`. The classes then get relayed to the `<svg>` element produced by the Heroicon. Effortlessly.

As discussed below, we are using three types of CSS classes.

### Using Regular TailwindCSS Utilities with Heroicons

We can use regular Tailwind CSS utilities like `h-6 w-6`:

```tsx
<MagnifyingGlassIcon className="h-6 w-6 mx-1 stroke-orange-400" />
```

In this case, we are using spacing utilities for height, width and margin.

### Using `SVG` Related TailwindCSS Utilities with Heroicons

We have also used a `SVG` related TailwindCSS class in the `<MagnifyingGlassIcon />` component - `stroke-orange-400` to set the stroke of the icon.

Another example is this:

```tsx
<Bars4Icon className="h-6 w-6 stroke-orange-400" />
```

Internally, `stroke-{color}-{saturation}` value is relayed to the `stroke` property of the `<svg>` element with `stroke= "currentColor```.

```html
<svg fill="none" stroke="currentColor"></svg>
```

### Using non-TailwindCSS Classes with Heroicons

We can use non-Tailwind classes as well:

```tsx
<UserIcon className="h-8 w-8 glow" stroke="pink" strokeWidth={1.2} />
```

For the `<UserIcon />`, we are applying a `glow` class that animates the icon with a glow `filter`. It's completely custom CSS and looks like this:

```css
.glow {
  animation: glow 0.8s alternate infinite;
}

@keyframes glow {
  0% {
    filter: drop-shadow(0 0 1px #fff) drop-shadow(0 0 2px #fff) drop-shadow(0 0 3px #ff80b3) drop-shadow(
        0 0 4px #ff4d94
      )
      drop-shadow(0 0 5px #ff0066);
  }
  29% {
    filter: drop-shadow(0 0 2px #fff) drop-shadow(0 0 4px #fff) drop-shadow(0 0 6px #ff80b3) drop-shadow(
        0 0 8px #ff4d94
      )
      drop-shadow(0 0 10px #ff0066);
  }

  92% {
    filter: drop-shadow(0 0 3px #fff) drop-shadow(0 0 6px #fff) drop-shadow(0 0 9px #ff80b3) drop-shadow(
        0 0 12px #ff4d94
      )
      drop-shadow(0 0 15px #ff0066);
  }
}
```

With the above changes Heroicons and their styles, the navbar looks like this:

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-18-heroicons/navbar-heroicons2.gif"  alt="tailwind flex" />
</div>

<br/>

### Applying Native `<svg>` Properties to Heroicons

Notice also that we are applying `stroke` and `strokeWidth` to `<UserIcon />`:

```tsx
<UserIcon className="h-8 w-8 glow" stroke="pink" strokeWidth={1.2} />
```

Native `<svg>` properties passed to Heroicons also get relayed to the `<svg>` element inside.

### Applying Responsive TailwindCSS Utils to Heroicons

Okay. Now, we'll consider the case for responsive use of Heroicons. We want each nav item to have its own icon left of its text. Like this:

 <div className="centered-image">
   <img style={{alignSelf:"center"}}  src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-09-18-heroicons/icon-items.gif"  alt="tailwind flex" />
</div>

<br/>

So, we'll go ahead and add the icons for each nav item:

<details>

<summary>Show Navbar.tsx</summary>

```tsx title="src/components/navbar/Navbar.tsx"
import React, { useState } from "react";
import TailzupLogo from "../icons/TailzupLogo";
import {
  Bars4Icon,
  ChatBubbleLeftRightIcon,
  HomeIcon,
  MagnifyingGlassIcon,
  UserGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuHidden = !isMobileMenuOpen ? "hidden md:block" : "";
  return (
    <nav className="navbar">
      <div className="brand-wrapper">
        <a className="brand" href="/">
          <TailzupLogo color="orange" />
        </a>
      </div>
      <div
        className={`${menuHidden} border-t border-slate-500 md:border-none text-amber-50 transition-all ease-in-out duration-1000`}
      >
        <div id="items" className="items-strip">
          <div id="left" className="items-left">
            <input className="text-input" type="email" placeholder="Find Donald  or something..." />
            <MagnifyingGlassIcon className="h-6 w-6 mx-1 stroke-orange-400" />
          </div>
          <div id="right">
            <ul className="items-list">
              <li className="nav-item md:order-last">
                <a href="/">
                  <UserIcon className="h-8 w-8 glow" stroke="pink" strokeWidth={1.2} />
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  {/*highlight-next-line*/}
                  <HomeIcon className="h-6 w-6 md:hidden lg:block" />
                  <span className="mx-2">Home</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  {/*highlight-next-line*/}
                  <UserGroupIcon className="h-6 w-6 md:hidden lg:block" />
                  <span className="mx-2">Friends</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/">
                  {/*highlight-next-line*/}
                  <ChatBubbleLeftRightIcon className="h-6 w-6 md:hidden lg:block" />
                  <span className="mx-2">Messages</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        className={`absolute top-3 right-4 p-1 border border-orange-400 rounded md:hidden text-slate-500 hover:text-slate-300 hover:bg-orange-200`}
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <a href="/">
          <Bars4Icon className="h-6 w-6 stroke-orange-400" />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
```

</details>

With `md:hidden lg:block` we are changing the visibility of the icon using responsive classes for each nav item. At `md`, we want the icon to be hidden and show up back at `lg`:

```tsx
<UserGroupIcon className="h-6 w-6 md:hidden lg:block" />
```

## Summary

In this post, we quickly picked how to use Heroicons with TailwindCSS and non-Tailwind classes. We found that Heroicons produce an `<svg` element which receives styles from the JSX component via `className`, and other native properties like `stroke`, `fill`, `height`, `width`, etc. We saw that, in order to style a Heroicon `<svg>`, we can pass related TailwindCSS classes like `stroke-{color}-{saturation}` and non Tailwind classes to `className` prop of the Heroicon component. We can also pass properties like `stroke`, `fill`, etc., to a Heroicon to style its `<svg>`. As usual, Heroicons can also be manipulated using responsive classes.
