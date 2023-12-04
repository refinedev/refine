---
title: Creating a React search bar and content filtering components
description: Article about how to create Search bar and filter component in React
slug: react-search-bar-and-filtering
authors: madars_biss
tags: [react, refine, tutorial]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-26-react-content-filtering/refine-filter-social.png
hide_table_of_contents: false
---

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

<img className="border border-gray-200 rounded" src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-26-react-content-filtering/final-app.jpeg" alt="Final app view" />

We will use the [refine](https://github.com/refinedev/refine) framework, which is based on React and allows users to build tools rapidly.

## Why refine framework?

Every refine project is easy to set up since it allows users to use the interactive terminal wizard. It takes less than a minute, with complete user control and no trade-offs between speed and flexibility.

refine includes a built-in data provider that enables users to connect to any API. The data providers come with built-in support for pagination, sorting, filtering, and other features. refine also provides some useful hooks and components that make it easier to build the app.

Just like data providers, refine also provides providers for authentication, authorization, and internationalization etc. These providers are optional and can be easily replaced with custom ones.

refine is a headless framework, meaning it does not include any UI components by default. This allows users to use any UI library they prefer or even create their own.

## App wireframe

The whole application will be wrapped in the layout component.

We will place the filtering UI on the top section of the app. There will be separate filter buttons for different types of content and a search bar, allowing users to narrow down their searches.

The content cards will be listed directly below.
When putting everything into the wireframe, we get the following schema:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-26-react-content-filtering/wireframe.jpeg" alt="wireframe" />

## Setting up the refine

We'll use the `npm create refine-app` command to interactively initialize the project, which will let us choose the project name, package manager, and other options.

```bash
npm create refine-app@latest filtering-tutorial
```

Select the following optionYs when prompted:

```bash
✔ Choose a project template · refine-vite
✔ What would you like to name your project?: · filtering-tutorial
✔ Choose your backend service to connect: · REST API
✔ Do you want to use a UI Framework?: · Headless
✔ Do you want to add example pages?: · No
✔ Do you need any Authentication logic?: · None
✔ Do you need i18n (Internationalization) support?: · No
✔ Choose a package manager: · npm
```

Once the setup is complete, navigate to the project folder and start your app with:

```bash
npm run dev
```

After the app has started, you should see the following page:

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-26-react-content-filtering/welcome.jpeg" alt="Welcome Page" />

## Add global styling

refine is a headless Framework, so it does not include any UI components by default. However, refine supports all major UI libraries, including [Ant Design](https://ant.design/), [Material UI](https://material-ui.com/), [Mantine](https://mantine.dev/), and [Chakra UI](https://chakra-ui.com/).

For this tutorial, we selected headless option, so we will create our own UI components. Let's start by adding some global styles.

In order to create the global styles, we will replace the `src/App.css` file with the following code:

```css title="src/App.css"
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

We don't need to import the `App.css` file anywhere since it is already imported in the `src/index.tsx` file by default.

## Creating the components

In this section, we will create the components that will be used in the app. We will create a filter box, a search bar, and a content card.

### Creating a filter box

The filter box will contain the filter buttons. It will be used to select the content based on its type - draft, published, or rejected.

To create the component files, run the following command:

```bash
mkdir src/components/filter && touch src/components/filter/index.tsx src/components/filter/index.module.css
```

After creating the files, we will add the following code to the `src/components/filter/index.tsx` file:

```typescript title="src/components/filter/index.tsx"
import styles from "./index.module.css";

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

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
    <div className={styles.wrapper} onClick={onClick} style={{ backgroundColor: `${isActive ? "lavender" : "white"}` }}>
      <div
        className={styles.circle}
        style={{
          borderColor: `${title === "draft" ? "gold" : title === "rejected" ? "tomato" : "limegreen"}`,
        }}
      ></div>
      <h3 className={styles.title}>{capitalize(title)}</h3>
    </div>
  );
};
```

We began by importing the style sheet file.

Next, we created a capitalize function that capitalizes the filter name used in the button.

We used the `isActive` prop to determine if the filter is active and assigned the background color accordingly using JavaScript template syntax.

Additionally, we used the title prop to assign the filter type and give it a specific color tag. The title prop is also used for the name of the filter.

Finally, we used the `onClick` prop to control the behavior when the filter button is pressed. We will pass it in during the later phase of the tutorial when implementing the main logic.

To style the component, we will add the following code to the `src/components/filter/index.module.css` file:

```css title="src/components/filter/index.module.css"
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

Initially, we set the flex layout for the component, along with some padding and margin. We then set the background color of the button to white and aligned the items vertically.

Next, we implemented the hover effect, which zooms in the button when the user moves the cursor over it.

We positioned the button's title to the left for the button's contents. For the color tag, we used a flex layout, added static width and height, set some margins, and described the border parameters.

<br/>
<div>
<a href="https://github.com/refinedev/refine">
  <img  src="https://refine.ams3.cdn.digitaloceanspaces.com/website/static/img/github-support-banner.png" alt="github support banner" />
</a>
</div>

### Creating a search bar

The search bar will be used to filter the content based on the user's search queries.

To create the component files, run the following command:

```bash
mkdir src/components/search && touch src/components/search/index.tsx src/components/search/index.module.css
```

After creating the files, we will add the following code to the `src/components/search/index.tsx` file:

```typescript title="src/components/search/index.tsx"
import styles from "./index.module.css";

export const Search = ({ onChange }: { onChange: React.ChangeEventHandler }) => {
  return <input className={styles.search} type="text" onChange={onChange} placeholder="Search by the title ..." />;
};
```

We began by importing the style sheet.

Next, we set the input type to text and added placeholder text to be displayed when there is no input. We also used the `onChange` prop to determine the behavior when the user enters input.

To style the component, we will add the following code to the `src/components/search/index.module.css` file:

```css title="src/components/search/index.module.css"
.search {
  width: 100%;
  margin-bottom: 50px;
  padding: 20px;
  border: none;
  border-radius: 10px;
  font-size: 20px;
}
```

To style the search bar, we made it use all the available width of the parent wrapper, added margin and padding, removed the default border, made the search box rounded, and defined a specific font size.

### Content card

The content card will be used to display the content.

To create the component files, run the following command:

```bash
mkdir src/components/card && touch src/components/card/index.tsx src/components/card/index.module.css
```

After creating the files, we will add the following code to the `src/components/card/index.tsx` file:

```typescript title="src/components/card/index.tsx"
import styles from "./index.module.css";

import { motion } from "framer-motion";

export const Card = ({ title, status }: { title: string; status: string }) => {
  return (
    <motion.div className={styles.wrapper} animate={{ opacity: 1 }} initial={{ opacity: 0 }} exit={{ opacity: 0 }}>
      <div
        className={styles.circle}
        style={{
          borderColor: `${status === "draft" ? "gold" : status === "rejected" ? "tomato" : "limegreen"}`,
        }}
      ></div>
      <h3 className={styles.title}>{title}</h3>
    </motion.div>
  );
};
```

We began by importing the style sheet.

Next, we imported the `framer-motion` library to animate the cards when the filters are applied. We passed it to the wrapper `div` and set it to animate from invisible to fully visible on entry and back to invisible on exit.

We used the `status` prop to assign a specific color tag to each card.

Finally, we used the `title` prop to display the content of the card.

To style the component, we will add the following code to the `src/components/card/index.module.css` file:

```css title="src/components/card/index.module.css"
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

To style the content card, we used a grid layout with two columns, added padding and margin, set the background color to white, bolded the font, centered everything vertically, and assigned slightly rounded borders.

We also improved the user experience by changing the cursor to a pointer when the user hovers over the content cards.

For the color tag, we used an `inline-block` layout with specified width and height and set custom border properties.

## Implementing the logic

Now that we have created the components, we will implement the logic of the app.

To do so, run the following command to create component files:

```bash
mkdir src/pages && mkdir src/pages/posts && touch src/pages/posts/index.tsx src/pages/posts/index.module.css
```

After creating the files, we will add the following code to the `src/pages/posts/index.tsx` file:

```typescript title="src/pages/posts/index.tsx"
import { useState } from "react";
import { useMany } from "@refinedev/core";
import { motion, AnimatePresence } from "framer-motion";

import { Filter } from "../../components/filter";
import { Search } from "../../components/search";
import { Card } from "../../components/card";

import styles from "./index.module.css";

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
                el.textContent?.toLowerCase() !== activeFilter ? setActiveFilter(filter) : setActiveFilter("");
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
          ?.filter((el) => el.title.toLowerCase().includes(inputValue.toLowerCase()))
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

Then we displayed the `<Search />` component and passed the `onChange` prop to it, which updates the `inputValue` variable each time the user enters any value in the search bar.

Finally, we looped through the posts and used the `filter` method to display only content values that include the results from the currently active search query and includes the type of currently active filter. We passed the `title` prop to display the content and the `status` prop to assign the type of each `<Card />` component being rendered.

Notice that we also wrapped the whole `<Card />` component into the `<AnimatePresence />` tags imported from the `framer-motion` library. Thanks to these tags, we will be able to provide the initial and exit transformations we assigned to the `<Card />` component in the previous section.

And that's it! We have successfully implemented the logic of the app. Now let's add some styles to make it look better.

```css title="src/pages/posts/index.module.css"
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

To style the filter buttons, we created a grid layout with three equally wide columns and assigned some gap between them.

Next, we added a media rule to the layout to switch to a single column layout for smaller screens. This means that each of the filter buttons will be shown directly above each other. We also removed the gap between them since each individual filter component already comes with a margin on the bottom.

<br />

Now that we have implemented the logic and added some styles, let's add the `<Posts />` component as a route to the app. To do so, we will replace the content of the `src/App.tsx` file with the following code:

```tsx title="src/App.tsx"
import { Refine, ErrorComponent } from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import dataProvider from "@refinedev/simple-rest";
import routerBindings, { UnsavedChangesNotifier, DocumentTitleHandler } from "@refinedev/react-router-v6";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";

import { Posts } from "./pages/posts";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <Refine
          dataProvider={dataProvider("https://api.fake-rest.refine.dev")}
          routerProvider={routerBindings}
          resources={[{ name: "posts", list: "/" }]}
          options={{
            syncWithLocation: true,
            warnWhenUnsavedChanges: true,
          }}
        >
          <Routes>
            <Route
              element={
                <div
                  style={{
                    maxWidth: "1000px",
                    margin: "0 auto",
                  }}
                >
                  <Outlet />
                </div>
              }
            >
              <Route index element={<Posts />} />
              <Route path="*" element={<ErrorComponent />} />
            </Route>
          </Routes>
          <RefineKbar />
          <UnsavedChangesNotifier />
          <DocumentTitleHandler />
        </Refine>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
```

This is the root file of the refine app, where we passed `routeProvider` for the routing, `dataProvider` to access the data API, and included the resources on the `/` route to use the `Posts` component we created in the previous step of the tutorial.

:::tip

Dataproviders are refine components making it possible to consume different API's and data services conveniently.

[Refer to the dataProvider documentation for detailed usage. →](https://refine.dev/docs/core/providers/data-provider/)

:::

Finally, we used wrapped the routes with `div` tags to add some styles to the layout.

## Testing the app

Check if your development server is still running in the terminal. If it is not run `npm run dev` to start it again.

First, we will test the functionality of the filter buttons.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-26-react-content-filtering/filters.gif" alt="filters" className="border border-gray-200 rounded" />

If the filter button is pressed, only the corresponding cards of that category is filtered. If the filter is already active and is pressed again, the filter is disabled and all the records are shown.

Now type in some search queries in the search bar.

<img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-26-react-content-filtering/search.gif" alt="search" className="border border-gray-200 rounded" />

Search results are fully dynamic, meaning the filtering is updated each time you add a new character to the query.

Finally, let's test the app on mobile screen sizes.

<div className="flex justify-center">
    <img src="https://refine.ams3.cdn.digitaloceanspaces.com/blog/2022-08-26-react-content-filtering/responsive.jpeg" alt="mobile" className="border border-gray-200 rounded" style={{ height: "400px" }} />
</div>

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
