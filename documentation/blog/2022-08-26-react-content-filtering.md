---
title: Creating a React search bar and content filtering components 
description: Article about how to create Search bar and filter component in React
slug: react-search-bar-and-filtering
authors: madars_biss
tags: [react, refine, tutorial]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-26-react-content-filtering/refine-filter-social.png
hide_table_of_contents: false
---

:::caution

This post was created using version 3.x.x of **refine**. Although we plan to update it with the latest version of **refine** as soon as possible, you can still benefit from the post in the meantime.

You should know that **refine** version 4.x.x is backward compatible with version 3.x.x, so there is no need to worry. If you want to see the differences between the two versions, check out the [migration guide](https://refine.dev/docs/migration-guide/).

Just be aware that the source code example in this post have been updated to version 4.x.x.

:::

## Introduction
Filtering systems are common for most modern web applications. They are especially useful if there are large amounts of data. They allow users to save time and easily access the information they are looking for.


<!--truncate-->


You will often meet various implementations in e-commerce stores, human resource management systems, video/blogging platforms, and many other sites.

Steps we'll cover:



- [Why refine framework?](#why-refine-framework)
- [App wireframe](#app-wireframe)
- [Setting up the refine](#setting-up-the-refine)
- [Add global styling](#add-global-styling)
- [Creating the components](#creating-the-components)
  - [Creating a filter box](#creating-a-filter-box)
  - [Creating a search bar](#creating-a-search-bar)
  - [Content card](#content-card)
- [Implementing the logic](#implementing-the-logic)
- [Testing the app](#testing-the-app)
- [Conclusion](#conclusion)





Today we will be building a filtering system that will let us sort the results through filter buttons and custom search queries.


<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-26-react-content-filtering/demo.png" alt="demo" />
</div>

<br/>

We will use the [refine](https://github.com/refinedev/refine) framework, which is based on React and allows users to build tools rapidly.


## Why refine framework?
Every refine project is easy to set up since it allows users to use the interactive terminal wizard. It takes less than a minute, with complete user control and no trade-offs between speed and flexibility.

refine also comes with a built-in data provider, meaning we will not have to look for any external sources of data. The data to filter will be easy to access via their built-in API.

Another advantage of the refine for this project will be their component structure. For example, it will allow us to easily create a standard layout component and integrate it from the root.


## App wireframe

The whole application will be wrapped in the layout component.


We will place the filtering UI on the top section of the app. There will be separate filter buttons for different types of content and a search bar, allowing users to narrow down their searches.

The content cards will be listed directly below.
When putting everything into the wireframe, we get the following schema:


<div class="img-container">
 <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-26-react-content-filtering/wireframe.png" alt="wireframe" /> 
</div>

<br/>

## Setting up the refine

The recommended way to set up the refine project is to use [superplate](https://github.com/pankod/superplate), which will let us configure the refine boilerplate.


Run `npm create refine-app@latest tutorial -- -p refine-react -b v3` and select your package manager, project name, user interface framework, router, data, auth provider, and internationalization library.


<div class="img-container">
 <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-26-react-content-filtering/terminal.png" alt="terminal" /> 
</div>

<br/>


Change the working directory to the newly created folder by running `cd tutorial` and then run `npm run dev` to start the refine development server.

Within seconds it should automatically bring up your default browser with the preview of the app. If it does not, open the browser manually and navigate to `http://localhost:3000`.



<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-26-react-content-filtering/boilerplate.png" alt="boilerplate" />
</div>

<br/>

## Add global styling

refine is a headless Framework, so it does not include UI Components by default. 
However, refine supports Materil UI and Antdesign for quick and easy solutions.


[Refer to refine tutorials for UI implementation examples](https://refine.dev/docs/#introduction)

We will create our custom styles.

In order to create the global style rules for the app, navigate to the `src` directory, create a new file `styles.css`, and include the following code:

```css title="src/styles.css"
@import url("https://fonts.googleapis.com/css2?family=Montserrat&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
}

body {
  padding: 20px;
  height: 100vh;
  background-color: #fee140;
  background-image: linear-gradient(90deg, #fee140 0%, #fa709a 100%);
}
```

We set some default margin, padding, and box-sizing rules for the application so that the app looks the same on different browsers. We also imported [Montserrat](https://fonts.google.com/) font.

For the body, we set some padding for the mobile screens, set the height to always fill the screen, and added a nice gradient based on orange and pink shades.


Finally, include the style sheet in the `index.tsx` file, which should then look like this:

```tsx title="src/index.tsx"
import React from "react";
import ReactDOM from "react-dom";
import "styles.css";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

## Creating the components

In this section, we will create a seperate folder for components and style them. We will use the terminal to create all the necessary files we designed in the wireframing phase to save time.

To do that, run the command: 

```
cd src && mkdir components && cd components && touch Filter.tsx Filter.module.css Search.tsx Search.module.css Card.tsx Card.module.css 
```

### Creating a filter box

To create a filter component used to select the content based on its type - draft, published, or rejected, open the `Filter.tsx` file and include the following code:

```typescript title="src/components/Filter.tsx"
import styles from "./Filter.module.css";

const capitalize = (str: string) =>
  str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

export const Filter = ({
  title,
  isActive,
  onClick,
}: {
  title: string;
  isActive: boolean;
  onClick: React.MouseEventHandler;
}) => {
  return (
    <div
      className={styles.wrapper}
      onClick={onClick}
      style={{ backgroundColor: `${isActive ? "lavender" : "white"}` }}
    >
      <div
        className={styles.circle}
        style={{
          borderColor: `${
            title === "draft"
              ? "gold"
              : title === "rejected"
              ? "tomato"
              : "limegreen"
          }`,
        }}
      ></div>
      <h3 className={styles.title}>{capitalize(title)}</h3>
    </div>
  );
};
```

We first imported the style sheet file to style the filter button.

Then we created a capitalize function that we will use to capitalize the filter name used in the button.

We used the `isActive` prop to decide whether or not the filter is active and assigned the background color accordingly using the JavaScript template syntax.

We also used the title prop to assign the filter type and give a specific color tag to it. The title prop is also used for the name of the filter.

Finally, we used the onClick prop, which will control the behavior when the filter button is pressed. We will pass it in in the later phase of the tutorial when implementing the main logic.

To style the filter button, open the `Filter.module.css` file and include the following rules:


```css title="src/components/Filter.module.css"
.wrapper {
  display: flex;
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: white;
  align-items: center;
  border-radius: 10px;
  transition: transform 0.2s;
}

.wrapper:hover {
  cursor: pointer;
  transform: scale(1.05);
}

.title {
  text-align: left;
}

.circle {
  display: flex;
  width: 20px;
  height: 20px;
  margin-right: 30px;
  border-radius: 50%;
  border-style: solid;
  border-width: 5px;
}
```


We first set the flex layout for the component, with some padding and margin. Then we set the background color of the button to be white and aligned the items vertically.

Then we implemented the hover effect, where the button gets zoomed in when the user moves the cursor over the button.

We set the button's title to be positioned left for the button's contents. For the color tag, we used a flex layout, added static width and height, set some margins, and described the border parameters.

<br/>
<div>
<a href="https://github.com/refinedev/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/github-support-banner.png" alt="github support banner" />
</a>
</div>



### Creating a search bar

To create a search component used to filter the content based on the custom user search queries, open the `Search.tsx` file and include the following code:

```typescript title="src/components/Search.tsx"
import styles from "./Search.module.css";

export const Search = ({
  onChange,
}: {
  onChange: React.ChangeEventHandler;
}) => {
  return (
    <input
      className={styles.search}
      type="text"
      onChange={onChange}
      placeholder="Search by the title ..."
    />
  );
};
```

We first imported the style sheet to style the search box.

Then we set the type of the input to be text, added some placeholder text to be displayed when there is no input as well as using the `onChange` prop, which will determine the behavior when the user enters the input.

To style the search bar, open the `Search.module.css` file and include the following rules:

```css title="src/components/Search.module.css"
.search {
  width: 100%;
  margin-bottom: 50px;
  padding: 20px;
  border: none;
  border-radius: 10px;
  font-size: 20px;
}
```

We set the search bar to use all the available with of the parent wrapper, added some margin and padding, removed the default border, set the search box to be rounded, and defined the specific font size.


---

<PromotionBanner isDark title="Open-source enterprise application platform for serious web developers"  description="refineNew" image="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/quick-start.gif" />


---

### Content card

To create a content card used to display the content, open the `Card.tsx` file and include the following code:

```typescript title="src/components/Card.tsx"
import styles from "./Card.module.css";

import { motion } from "framer-motion";

export const Card = ({ title, status }: { title: string; status: string }) => {
  return (
    <motion.div
      className={styles.wrapper}
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <div
        className={styles.circle}
        style={{
          borderColor: `${
            status === "draft"
              ? "gold"
              : status === "rejected"
              ? "tomato"
              : "limegreen"
          }`,
        }}
      ></div>
      <h3 className={styles.title}>{title}</h3>
    </motion.div>
  );
};
```


We first imported the style sheet to style the content card.

Then we imported the `framer-motion` library to animate the cards when the filters are being applied. We passed it to the wrapper `div` and set it to animate from invisible to fully visible on entry and back to invisible on exit.

We used the `status` prop to assign a specific color tag to each card.

Finally, we made use of the `title` prop to display the content of the card.

To style the content card, open the `Card.module.css` file and include the following rules:

```css title="src/components/Card.module.css"
.wrapper {
  display: grid;
  grid-template-columns: 50px auto;
  padding: 20px;
  margin-bottom: 20px;
  background-color: white;
  font-weight: bold;
  align-items: center;
  border-radius: 10px;
}

.wrapper:hover {
  cursor: pointer;
}

.circle {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-style: solid;
  border-width: 5px;
  border-radius: 50%;
}
```

We set the content card to use a grid layout that includes two columns. We also added some padding and margin, set the background color to white, bolded the font, centered everything vertically, and assigned slightly rounded borders.

We also improved the UX by changing the cursor to the pointer when the user hovers over the content cards.

For the color tag, we used an inline-block layout with specified width and height and set custom border properties.

## Implementing the logic

While still on the `components` folder, run a terminal command `touch Posts.tsx Posts.module.css` to create the file for the logic of the app and style it.

Open `Posts.tsx` and include the following code:

```typescript title="src/components/Posts.tsx"
import { useState } from "react";
import { useMany } from "@refinedev/core";

import { Filter } from "./Filter";
import { Search } from "./Search";
import { Card } from "./Card";

import { motion, AnimatePresence } from "framer-motion";
import styles from "./Posts.module.css";

export const Posts = () => {
  const [inputValue, setInputValue] = useState("");
  const [activeFilter, setActiveFilter] = useState("");

  const posts = useMany<{
    id: number;
    title: string;
    status: string;
  }>({
    resource: "posts",
    ids: Array.from(Array(8).keys()).slice(1),
  }).data?.data;

  const filters: string[] = ["published", "draft", "rejected"];

  return (
    <motion.div>
      <div className={styles.filters}>
        {filters.map((filter, index) => {
          return (
            <Filter
              key={index}
              title={filter}
              isActive={filter === activeFilter}
              onClick={(e: React.MouseEvent) => {
                const el = e.target as HTMLElement;
                el.textContent?.toLowerCase() !== activeFilter
                  ? setActiveFilter(filter)
                  : setActiveFilter("");
              }}
            />
          );
        })}
      </div>
      <Search
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setInputValue(e.target.value);
        }}
      />
      <AnimatePresence>
        {posts
          ?.filter((el) =>
            el.title.toLowerCase().includes(inputValue.toLowerCase())
          )
          .filter((e) => e.status.includes(activeFilter))
          .map((post: { title: string; status: string }, index: number) => {
            return <Card key={index} title={post.title} status={post.status} />;
          })}
      </AnimatePresence>
    </motion.div>
  );
};
```

We first imported the `useState` hook to track the state of the app. Then we imported the [`useMany`](https://refine.dev/docs/core/hooks/data/useMany/) hook from refine to access the records of the integrated data API.

Then we imported all the components we created in the earlier phase of the tutorial, as well as the `framer-motion` library for animations and custom style rules to style the layout.

We used the `inputValue` variable to store the current state of the search input and the `activeFilter` variable to track the currently active filter.

Next, we accessed the `posts` route of the API and made sure we fetch data from it. We also created `filters` array to define the filters that we will be using.

We first looped through all the filter elements and displayed them using the `<Filter/>` component. We passed the `title` prop to show the name of the filter, the `isActive` prop to show whether or not the particular filter is active, and the `onClick` prop to make an inactive filter active in the case of a click event and the other way around.

Then we displayed the `<Search/>` component and passed the `onChange` prop to it, which updates the `inputValue` variable each time the user enters any value in the search bar.

Finally, we looped through the posts and used the `filter` method to display only content values that include the results from the currently active search query and includes the type of currently active filter. We passed the `title` prop to display the content and the `status` prop to assign the type of each `<Card>` component being rendered.

Notice that we also wrapped the whole `<Card>` component into the `<AnimatePresence>` tags imported from the `framer-motion` library. Thanks to these tags, we will be able to provide the initial and exit transformations we assigned to the `<Card>` component in the previous section.

We also need to create a layout wrapper for the filters. To do that, open the `Posts.module.css` file and include the following rules:


```css title="src/components/Post.module.css"
.filters {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

@media only screen and (max-width: 650px) {
  .filters {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
```


We first created a grid layout with three equally wide columns for each filter and assigned some gap between them.

Then we made a media rule to the layout to switch to the single column layout for the smaller screens, meaning each of the filter buttons will be shown directly above each other. We also removed the gap between them since each individual filter component already comes with the margin on the bottom.

Now switch one level up to the `src` root and include the following code in the `App.tsx` file:


```tsx title="App.tsx"
import { Refine } from "@refinedev/core";
import routerProvider from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";

import { Posts } from "components/Posts";

function App() {
  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
      resources={[{ name: "posts", list: Posts }]}
      Layout={({ children }) => (
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div>{children}</div>
        </div>
      )}
    />
  );
}

export default App;
```

This is the root file of the refine app, where we passed `routeProvider` for the routing, `dataProvider` to access the data API, and included the resources on the `posts` route to use the `Posts` component we created in the previous step of the tutorial.

:::tip
Dataproviders are refine components making it possible to consume different API's and data services conveniently. 

[Refer to the dataProvider documentation for detailed usage. →](https://refine.dev/docs/core/providers/data-provider/)
:::

Finally, we used the `Layout` to create the main wrapper for the app. We set it to never exceed a certain width and centered it on the screen horizontally. All the content of the `Layout` were directly passed in as the `children` prop.


## Testing the app

Check if your development server is still running in the terminal. If it is not run `npm run dev` to start it again.

First, we will test the functionality of the filter buttons.


<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-26-react-content-filtering/filters.gif" alt="filters" />
</div>

<br/>

If the filter button is pressed, only the corresponding cards of that category is filtered. If the filter is already active and is pressed again, the filter is disabled and all the records are shown.

Now type in some search queries in the search bar.

<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-26-react-content-filtering/search.gif" alt="search" />
</div>

<br/>

Search results are fully dynamic, meaning the filtering is updated each time you add a new character to the query.

Finally, let's test the app on different screen sizes.


<div class="img-container">
    <div class="window">
        <div class="control red"></div>
        <div class="control orange"></div>
        <div class="control green"></div>
    </div>
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-26-react-content-filtering/mobile.gif" alt="mobile" />
</div>

<br/>

## Conclusion

In this tutorial, we first designed the overall layout for the app, then set up the refine project and created the global style rules. Then we created the individual components, put together the logic, and passed it to the refine app.

Two different types of content filtering (filter buttons and search bar) were implemented. In order to improve the overall user experience, we used the Framer motion library to add some great animations.

Feel free to modify the app with your own custom features. Play around with different color schemes, layouts, and font families. Also, since refine comes with a rich data provider, feel free to extend the content card with description, author, dates, or even images.

<br/>
<div>
<a href="https://discord.gg/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/discord_big_blue.png" alt="discord banner" />
</a>
</div>



## Example

<CodeSandboxExample path="blog-refine-filtering" />

