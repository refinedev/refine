---
title: Next.js vs React - A Beginner's Guide
description: We will be looking at the core differences between React and Next.js, using rendering, routing, and configuration as our basis for comparison.
slug: next-js-vs-react
authors: marvel_ken
tags: [react, nextjs]
image: https://refine.ams3.cdn.digitaloceanspaces.com/blog/2023-10-10-nextjs-vs-react/social.png
hide_table_of_contents: false
---

## Introduction

Newbies often think there's some tech rivalry when they hear about [React](https://react.dev/) and [Next.js](https://nextjs.org/). But in reality, React and Next.js share a parent-child bond. Just like in families where children sometimes outshine their parents in certain areas, Next.js brings its strengths to the table, But it's not about one being better than the other. The real questions are: Which one is simpler for me? Which feels safer? Do I have choices, or do I need to be a certain kind of developer to use them? Understanding this relationship helps make informed decisions about which to stick within your next project.

The primary goal of this comparison is to understand the core differences between Next.js and React.js. This involves diving into the architecture, configuration, and use cases they are best suited for. By understanding these fundamental differences, developers can gain deep insights into how each can be leveraged for different projects.

Steps we'll cover:

- [Core Differences between Next.js and React.js](#core-differences-between-nextjs-and-reactjs)
  - [Server-side Rendering in Next.js vs. Client-side Rendering in React.js](#server-side-rendering-in-nextjs-vs-client-side-rendering-in-reactjs)
    - [Client-side Rendering](#client-side-rendering)
    - [Server-Side Rendering](#server-side-rendering)
- [The question arises: which method is the better option?](#the-question-arises-which-method-is-the-better-option)
- [Static Site Generation](#static-site-generation)
  - [React: The Foundation](#react-the-foundation)
  - [Next.js: Enhanced SSG Capabilities](#nextjs-enhanced-ssg-capabilities)
- [Routing](#routing)
  - [Next.js: File-based Routing](#nextjs-file-based-routing)
  - [Basic Page Routes](#basic-page-routes)
  - [Dynamic Routes](#dynamic-routes)
- [Navigation with the\*\* `**Link**` \*\*Component](#navigation-with-the-link-component)
- [React's Route Approach](#reacts-route-approach)
  - [The `react-router-dom` Library](#the-react-router-dom-library)
- [React Dynamic Routing](#react-dynamic-routing)
- [Next.js Configuration](#nextjs-configuration)
- [React Configuration](#react-configuration)
- [Starting Up Both Projects](#starting-up-both-projects)

## Brief Overview of React.js

React.js, often called React, is an open-source JavaScript library developed by Facebook for building user interfaces, particularly for single-page applications. Its core strength lies in its component-based architecture, allowing developers to create reusable pieces of code that dictate how elements should appear on the screen.

One of React's standout features is the [Virtual DOM](<https://legacy.reactjs.org/docs/faq-internals.html#:~:text=The%20virtual%20DOM%20(VDOM)%20is,a%20library%20such%20as%20ReactDOM.>), which intelligently updates only the parts of the page that change, ensuring efficient and speedy rendering. React employs JSX (JavaScript XML) for templating, blending the familiarity of HTML with the power of JavaScript. This unidirectional data flow and integration with various backend technologies make it flexible and manageable.

## Brief Overview of Next.js

One of the distinctive things about Next.js is its versatility to be used in the Front and Backend. If anyone refers to Next.js as a backend framework, they would be as correct as those who refer to it as a frontend framework. The primary reason it is referred to as a backend framework is its ability to render the server side, which we will discuss later in this tutorial.

Everything that can be possibly done in React can be effectively carried out in Next.js too, with the added full-stack features.

## Core Differences between Next.js and React.js

In this section, we will be looking at the core differences between React and Next.js, using rendering,

### Server-side Rendering in Next.js vs. Client-side Rendering in React.js

There are many talks about Server-side rendering(SSR) and client-side rendering. What exactly are these, and how do they differentiate Next.js and React.js?

#### Client-side Rendering

It's important to note that this is a relatively new approach to rendering site content, and the emergence of React.js made this famous as it was incorporated into their development.

Client-side rendering is the technique of dynamically generating content in the browser using JavaScript. Instead of receiving a fully populated HTML document from the server, the browser obtains a skeletal HTML structure accompanied by a JavaScript file. This file then takes on the responsibility of rendering the remainder of the site's content directly within the browser. With CSR, the user would experience a little delay as the browser needs to load the javascript first.

#### Server-Side Rendering

Since the emergence of the browser, the known method for getting your HTML onto a screen was by using server-side rendering.

Server-side rendering (SSR) is a process in which a website's content is generated on the web server instead of the browser. In this approach, the server creates the initial HTML representation of the application and sends it directly to the client or browser. This takes a few milliseconds with a good internet connection to do.

When Facebook first launched in 2004, web development was primarily server-centric. Websites, including the initial version of Facebook, relied heavily on Server-Side Rendering (SSR). This means that every time a user performs an action, like adding a friend or posting a status, the server generates a new HTML page and sends it back to the browser. This often resulted in full-page reloads.

As web development evolved, the concept of Client-Side Rendering (CSR) gained traction. Instead of relying on the server to render every change, CSR leverages the power of the user's browser to dynamically update content.

Imagine the early Facebook feed. With SSR, every time you liked a post or added a comment, the entire page might need to refresh to reflect that change. With CSR, only the specific section of the page that changed (e.g., the like count or the comments section) would update without a full page reload. This provides a smoother and faster user experience.

## The question arises: which method is the better option?

It all depends on what exactly is to be done, but the idea of Next.JS being client-side rendered is not all that. Next, versatility enables it to perform on any level, it can be used on the
Server-side in two ways:

By using useEffect():

```tsx
import React, { useState, useEffect } from "react";

export function Page() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.example.com/data");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
      } catch (e) {
        setError(e);
        console.error("An error occurred while fetching the data: ", e);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <p>Error fetching data: {error.message}</p>;
  }

  return <p>{data ? `Your data: ${data}` : "Loading..."}</p>;
}
```

This approach also applies to React applications, as you could choose to use useEffect(), but it's advisable to use a library like it is recommended using a data-fetching library for better performance. Here's a minimum example using [React Query](https://refine.dev/blog/react-query-guide/#react-query-and-frameworks) to fetch data on the client:

```tsx
import React from "react";
import { useQuery } from "react-query";

// Function to fetch data
const fetchData = async () => {
  const response = await fetch("https://api.example.com/data");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

function App() {
  // Using the useQuery hook to fetch data
  const { data, error, isLoading } = useQuery("fetchData", fetchData);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Data from API:</h1>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
```

The advantage of Next.js js is in the power of options; a developer's gift of choice is essential as an external library would not be needed to perform server-side rendering in Next.js, unlike React.js.

To use Server-side Rendering in Next.js, you need to `export` an `async` function called `getServerSideProps`. This function is called by the server for each incoming request.

For instance, if your page requires pre-rendering of data that updates regularly (sourced from an external API), you can write a `**getServerSideProps**` function. This function fetches the necessary data and supplies it to the `**Page**` component as illustrated below:

```tsx
export default function Page({ fetchedData }) {
  // Use fetchedData for rendering...
}

// Called on every server-side request
export async function getServerSideProps() {
  // Retrieve data from the external API
  const response = await fetch("https://.../data");

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const fetchedData = await response.json();

  // Supply data to the page through props
  return { props: { fetchedData } };
}
```

Generally, it's important to note, in terms of initial page load times, that a server-rendered application using Next.js could potentially offer faster performance compared to a client-side rendered React application. The difference in performance can vary based on several factors, but the benefits of SSR, especially for SEO and perceived load times, are notable.

## Static Site Generation

Static Site Generation (SSG) has become a popular approach in web development, offering faster initial page loads. Both React and Next.js provide mechanisms for SSG, but they differ in their implementation and capabilities.

### React: The Foundation

React by default, renders content dynamically in the browser. To achieve SSG with React, developers would often rely on additional tools and configurations. React doesn't natively support SSG. Instead, developers use tools like Create React App in conjunction with other libraries to pre-render content.

### Next.js: Enhanced SSG Capabilities

[Next.js takes SSG to the next level](https://nextjs.org/docs/pages/building-your-application/data-fetching/get-static-props), offering in-built support and an easy developer experience.
Pages in Next.js without any data-fetching methods are automatically pre-rendered as static HTML, optimizing them for performance.

Next.js also introduces the `getStaticProps` function, allowing developers to fetch data at build time and generate static pages. This is ideal for content that doesn't change frequently. In development mode, `next dev`, pages are compiled on demand. Whereas, at the production build `next build` pre-renders pages to HTML, optimizing them for deployment.

The terminal provides clear logs showing which pages are being statically generated. With `**next export**`, developers can generate a fully static site suitable for hosting on static platforms.

## Routing

While React itself doesn't provide built-in routing solutions, Next.js introduces a great approach. In this section, we will understand the comparisons between routing in Next.js and React.

### Next.js: File-based Routing

Next.js brings a refreshing take on routing, making it super efficient. Let's see how:

### Basic Page Routes

In Next.js, the `**pages**` directory isn't just another folder; it's the heart of your application's routing. The framework successfully transforms the file structure here into routes. This is what the directory looks like:

```tsx
    pages
    |-- OurTeam.tsx  -> /our-team
```

```tsx title="pages/our-team.tsx"
function OurTeam() {
  return <div>Welcome to the Our Team page!</div>;
}

export default OurTeam;
```

### Dynamic Routes

For scenarios where static paths aren't needed, Next.js understands that not all routes are static. For example, if you're building an e-commerce site and want to display Members details dynamically, you can use a structure like:

```tsx
    pages
    |-- team
        |-- [memberId].tsx  -> /team/jane-doe, /team/john-doe, etc.
```

This is what the code would look like:

```tsx title="pages/team/[memberId].tsx"
function TeamMember({ memberId }) {
  return <div>Welcome to the profile of {memberId}!</div>;
}

// Fetching the memberId from the route
export async function getServerSideProps(context) {
  return {
    props: { memberId: context.params.memberId },
  };
}

export default TeamMember;
```

## Navigation with the** `**Link**` **Component

Next.js introduces a custom `**Link**` component. This component pre-fetches data when a user hovers over a link, enhancing the application's performance.

```tsx
import Link from "next/link";

function HomePage() {
  return (
    <div>
      Welcome to the Home page!
      <Link href="/our-team">Visit Our Team</Link>
    </div>
  );
}

export default HomePage;
```

## React's Route Approach

React is stiff about routing. This flexibility means you can choose your adventure, but it also means you need to set things up yourself.

### The `react-router-dom` Library

The most popular choice for routing in React applications is the [react-router-dom](https://www.npmjs.com/package/react-router-dom) library. It provides a set of components and hooks to define and manage routes.

Routes are defined using the `**Route**` component, and navigation is typically handled by the `**Link**` or `**NavLink**` components.

```tsx
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Link to="/our-team">Our Team</Link>
        <Route path="/our-team" component={OurTeam} />
      </div>
    </Router>
  );
}

function OurTeam() {
  return <div>Welcome to the Our Team page!</div>;
}
```

## React Dynamic Routing

With react-router-dom, dynamic routes are achieved using the `**:parameter**` syntax. For instance, to create a dynamic route for team members, you'd use a path like `**/team/:memberId**`.

```tsx
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Link to="/team/jane-doe">Jane Doe's Profile</Link>
        <Route path="/team/:memberId" component={TeamMember} />
      </div>
    </Router>
  );
}

function TeamMember(props) {
  return <div>Welcome to the profile of {props.match.params.memberId}!</div>;
}
```

**Drawing Comparisons**

- **Simplicity vs. Flexibility**: Next.js offers a straightforward, file-based routing system, making it easy for developers to set up routes without additional configuration. React, with `**react-router-dom**`, provides more flexibility but requires manual setup.
- **Performance**: Next.js's `**Link**` component enhances performance by pre-fetching pages, a feature not inherent in vanilla React routing.
- **Learning Curve**: For beginners, Next.js's intuitive routing can be easier to grasp. Meanwhile, React's routing, while powerful, might have a steeper learning curve due to its nature.

## Next.js Configuration

One of the standout features of Next.js is its "zero-config" approach. While Next.js works great with no configuration, there are times when you might need to customize its behavior. This is where `**next.config.js**` comes into play cause they came prepared. This file, placed at the root of your project, allows you to tweak various aspects of Next.js, from setting up environment variables to customizing Webpack and Babel configurations.

Next.js also has built-in support for TypeScript. Simply adding a `**tsconfig.json**` file to your project is enough for Next.js to configure TypeScript for you. At its best, Next.js supports global CSS, module CSS, and Sass out of the box. You can also easily integrate other CSS-in-JS libraries using plugins or custom configurations.

## React Configuration

The most common way to set up a new React project is using the Create-React-App. It provides a setup with Webpack, Babel, and a development server. However, it abstracts away the configuration, making it a bit complex to customize without "ejecting" (which exposes all configurations).

If you need to customize the configuration of a CRA project, you can "eject" it. This process will generate all the configuration files, giving you full control. However, once ejected, you can't go back, and you'll have to manage updates and configurations manually.

React doesn't enforce a specific folder structure. While this offers flexibility, you'll need to decide on a structure and stick to it for consistency.

React doesn't have a default way to handle CSS. You can use regular CSS, and CSS modules, or opt for CSS-in-JS solutions like styled-components. Each method might require its configuration and dependencies.

**Use Cases and Suitability**
Next.js is an ideal choice for a range of applications, particularly for e-commerce platforms and blogs. Its strength lies in its hybrid rendering capabilities, offering both server-side rendering (SSR) and static site generation (SSG). This ensures fast page loads, which are very important for e-commerce sites and blogs where user experience and immediate visibility directly impact success.

On the other hand, React.js, in its core form without frameworks like Next.js, provides a more flexible foundation. It's particularly well-suited for building dynamic single-page applications (SPAs) such as social media platforms. These applications benefit from React's component-based architecture, enabling seamless user interactions without frequent page reloads.

## Starting Up Both Projects

To start up a development area for Next.js and React follow the procedures below:

### For React

**Installation:** First, ensure you have Node.js and npm (Node Package Manager) installed. If not, download and install them from [Node.js official website](https://nodejs.org/).

**Create a New React App:** Use the Vite tool to quickly set up a new React project:

```bash
npm create vite@latest
```

When the command begins to run, it will ask for a project name. Enter your project's name and press the enter key.

Following that, Vite will ask you to choose a framework. Opt for React.
**Navigate to Your App:** Change your directory to the newly created app:

```bash
cd react-app-name
```

**Start the Development Server:** Run the following command to start the local development server:

```bash
npm install && npm start
```

### For Next.js

**Installation:** Just like with React, ensure you have Node.js and npm installed.

**Create a New Next.js App:** Use the `**create-next-app**` tool to initiate a new Next.js project:

```bash
npx create-next-app next-app-name
```

**Navigate to Your App:** Change your directory to the newly created app:

```bash
cd next-app-name
```

**Start the Development Server:** Run the following command to start the local development server:

```bash
npm run dev
```

Your Next.js app will now be running on `**http://localhost:3000/**`, just like the React app. If you're running both simultaneously, you might want to change the port for one of them to avoid conflicts.

## Conclusion

We have been able to understand the differences, shining light on strengths and little weaknesses that we may have noticed. To an extent, Next.js as a child came in prepared with unique qualities, which have been discussed, and if I must advise, React shouldn't be used on its own. Despite it being a great library, it's advisable it's utilized through a framework like Next.js
